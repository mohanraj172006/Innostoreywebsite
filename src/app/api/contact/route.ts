import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory sliding window rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions per window
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  // RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  // 1. IP extraction & Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a few minutes before trying again.",
      },
      { status: 429 }
    );
  }

  // 2. Body size check (reject payloads > 50KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 50000) {
    return NextResponse.json(
      { success: false, message: "Request payload too large." },
      { status: 413 }
    );
  }

  // 3. JSON parsing
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON request format." },
      { status: 400 }
    );
  }

  // 4. Honeypot check for automated spam bots
  if (body.hp || body.website || body.company_url) {
    // Silently return success to mislead spambots
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  }

  // 5. Field extraction and whitespace trimming
  const rawName = String(body.name ?? "").trim();
  const rawEmail = String(body.email ?? "").trim();
  const rawPhone = String(body.phone ?? "").trim();
  const rawSubject = String(body.subject ?? "").trim();
  const rawMessage = String(body.message ?? "").trim();

  // 6. Server-side validation
  // Validate Name
  if (!rawName || rawName.length > 100 || /[\r\n]/.test(rawName)) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid name (maximum 100 characters)." },
      { status: 400 }
    );
  }

  // Validate Email & prevent header injection
  if (!rawEmail || rawEmail.length > 254 || /[\r\n]/.test(rawEmail) || !isValidEmail(rawEmail)) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Validate Message
  if (!rawMessage || rawMessage.length > 5000) {
    return NextResponse.json(
      { success: false, message: "Please provide a message (maximum 5000 characters)." },
      { status: 400 }
    );
  }

  // Validate optional Phone
  if (rawPhone && (rawPhone.length > 30 || /[\r\n]/.test(rawPhone))) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid phone number (maximum 30 characters)." },
      { status: 400 }
    );
  }

  // Validate optional Subject
  if (rawSubject && (rawSubject.length > 200 || /[\r\n]/.test(rawSubject))) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid inquiry subject (maximum 200 characters)." },
      { status: 400 }
    );
  }

  const cleanPhone = rawPhone || "Not provided";
  const cleanSubject = rawSubject || "Not provided";

  // 7. Check server-side SMTP credentials
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass || smtpPass === "YOUR_GMAIL_APP_PASSWORD") {
    console.error(
      "[Contact API] Missing or unconfigured SMTP credentials. Please set SMTP_USER and SMTP_PASS in .env.local."
    );
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message right now. Please try again later.",
      },
      { status: 500 }
    );
  }

  // 8. Construct Email Details
  const now = new Date();
  const receivedAtIso = now.toISOString();
  const receivedAtFormatted = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const emailSubject = "New Contact Inquiry - InnoStorey";

  // Plain-text email
  const plainText = [
    "New Contact Inquiry - InnoStorey",
    "================================",
    "",
    `Name: ${rawName}`,
    `Email: ${rawEmail}`,
    `Phone Number: ${cleanPhone}`,
    `Inquiry Subject: ${cleanSubject}`,
    "",
    "Message:",
    rawMessage,
    "",
    `Received At: ${receivedAtFormatted} (UTC: ${receivedAtIso})`,
  ].join("\n");

  // Professional HTML email
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry - InnoStorey</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0b0b0b; padding: 28px 32px; border-bottom: 3px solid #FFD700; text-align: left;">
              <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #FFD700; margin-bottom: 6px;">InnoStorey Website</span>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.02em;">New Contact Inquiry</h1>
            </td>
          </tr>

          <!-- Summary Table -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 35%; font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; font-weight: 600; color: #111827;">${escapeHtml(rawName)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #2563eb;">
                    <a href="mailto:${escapeHtml(rawEmail)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(rawEmail)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em;">Phone Number</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #111827;">
                    ${cleanPhone !== "Not provided" ? `<a href="tel:${escapeHtml(cleanPhone)}" style="color: #111827; text-decoration: none;">${escapeHtml(cleanPhone)}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em;">Inquiry Subject</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #111827;">${escapeHtml(cleanSubject)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em;">Received At</td>
                  <td style="padding: 10px 0; font-size: 13px; color: #4b5563;">${escapeHtml(receivedAtFormatted)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 8px 32px 28px 32px;">
              <div style="font-size: 12px; text-transform: uppercase; font-weight: 600; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 8px;">Message:</div>
              <div style="background-color: #f9fafb; border-left: 4px solid #FFD700; border-radius: 6px; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap; word-break: break-word;">${escapeHtml(rawMessage)}</div>
            </td>
          </tr>

          <!-- Action Button / Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
              <a href="mailto:${escapeHtml(rawEmail)}?subject=Re:%20${encodeURIComponent(cleanSubject !== 'Not provided' ? cleanSubject : 'Inquiry to InnoStorey')}" 
                 style="display: inline-block; background-color: #0b0b0b; color: #FFD700; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 6px; border: 1px solid rgba(255, 215, 0, 0.4);">
                Reply to ${escapeHtml(rawName)}
              </a>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #9ca3af;">
                Direct submission from InnoStorey contact form. Reply directly to this email to contact the sender.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // 9. Send via Nodemailer SMTP
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL port 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"InnoStorey Inquiry" <${smtpUser}>`,
      to: "innostoreyinnovations@gmail.com",
      replyTo: rawEmail,
      subject: emailSubject,
      text: plainText,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[Contact API] SMTP send error:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
