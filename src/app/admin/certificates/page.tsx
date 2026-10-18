"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  LogOut,
  Users,
  Clock,
  CheckCircle2,
  Search,
  Upload,
  Loader2,
  AlertCircle,
  CheckCheck,
  RefreshCw,
  FileText,
  Eye,
  EyeOff,
  Filter,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Registration {
  id: string;
  registration_code: string;
  register_number: string;
  full_name: string;
  college_name: string;
  workshop_session: string;
  email: string;
  certificate_status: "Pending" | "Available";
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  available: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="neon-card p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-[#666] uppercase tracking-widest">{label}</p>
        <p className="font-serif text-3xl font-light text-white">{value}</p>
      </div>
    </div>
  );
}

// ─── Upload Modal ─────────────────────────────────────────────────────────────
function UploadModal({
  reg,
  token,
  onClose,
  onSuccess,
}: {
  reg: Registration;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setError(null);
    if (f) {
      if (f.type !== "application/pdf") {
        setError("Only PDF files are accepted.");
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setError("File size must be under 10 MB.");
        return;
      }
    }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("id", reg.id);
      fd.append("file", file);

      const res = await fetch("/api/admin/certificates/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Upload failed. Please try again.");
        return;
      }
      setDone(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && !uploading && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="neon-card w-full max-w-md p-8 space-y-6"
      >
        {done ? (
          <div className="text-center space-y-3 py-4">
            <CheckCheck className="w-12 h-12 text-[#FFD700] mx-auto" />
            <p className="font-serif text-xl text-white">Certificate Uploaded!</p>
            <p className="text-xs text-[#777]">Status updated to Available.</p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-light text-white">
                {reg.certificate_status === "Available"
                  ? "Replace Certificate"
                  : "Upload Certificate"}
              </h3>
              <p className="text-xs text-[#666]">
                {reg.full_name} · {reg.workshop_session}
              </p>
              <p className="text-[10px] font-mono text-[#444]">
                {reg.registration_code}
              </p>
            </div>

            {reg.certificate_status === "Available" && (
              <div className="flex items-start gap-2 bg-[#FFD700]/10 border border-[#FFD700]/25 rounded-xl p-3">
                <AlertCircle className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                <p className="text-xs text-[#A8A8A8]">
                  A certificate already exists. Uploading a new file will
                  replace the existing one after a successful upload.
                </p>
              </div>
            )}

            {/* File picker */}
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-[#FFD700]/50 rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 space-y-2"
            >
              <Upload className="w-8 h-8 text-[#444] mx-auto" />
              {file ? (
                <p className="text-sm text-[#FFD700] font-medium">{file.name}</p>
              ) : (
                <p className="text-xs text-[#555]">
                  Click to select a PDF certificate
                  <br />
                  <span className="text-[#444]">Maximum size: 10 MB</span>
                </p>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFile}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-3">
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={uploading}
                className="btn-neon flex-1 py-3 text-xs justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="btn-neon-solid flex-1 py-3 text-xs justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({
  reg,
  token,
  onClose,
  onSuccess,
}: {
  reg: Registration;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/certificates?id=${encodeURIComponent(reg.id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to delete registration.");
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="neon-card w-full max-w-md p-6 space-y-6 relative border-red-500/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-light text-white">Delete Registration</h2>
              <p className="text-[10px] text-[#666]">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={deleting}
            className="text-[#555] hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Registration Summary */}
        <div className="bg-[#0D0D0D] border border-[#222] rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#666]">Name</span>
            <span className="text-white font-medium">{reg.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Reg. Number</span>
            <span className="text-[#AAA] font-mono">{reg.register_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Code</span>
            <span className="text-[#FFD700] font-mono">{reg.registration_code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Session</span>
            <span className="text-[#888]">{reg.workshop_session}</span>
          </div>
        </div>

        {/* Warning if certificate uploaded */}
        {reg.certificate_status === "Available" ? (
          <div className="flex items-start gap-2.5 bg-red-950/30 border border-red-500/30 rounded-xl p-3.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 leading-relaxed">
              An issued certificate file is associated with this registration. Deleting will permanently remove both the database record and the uploaded PDF from storage.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 bg-orange-950/30 border border-orange-500/30 rounded-xl p-3.5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-300 leading-relaxed">
              Are you sure you want to delete this pending registration? This cannot be recovered.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-3">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="btn-neon flex-1 py-3 text-xs justify-center"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 py-3 text-xs font-semibold rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Confirm Delete
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok || !data.accessToken) {
        setError(data.error ?? "Login failed.");
        return;
      }
      onLogin(data.accessToken);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neon-card w-full max-w-md p-10 space-y-8"
      >
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-[#FFD700]" />
          </div>
          <h1 className="font-serif text-2xl font-light text-white">
            Admin <span className="gold-gradient-text">Login</span>
          </h1>
          <p className="text-xs text-[#555]">Certificate Management Dashboard</p>
        </div>

        <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#A8A8A8] mb-2"
            >
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              placeholder="admin@innostorey.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#A8A8A8] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neon-input pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#FFD700] transition-colors"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className="btn-neon-solid w-full py-4 text-xs justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function AdminCertificatesPage() {
  const [token, setToken]                   = useState<string | null>(null);
  const [stats, setStats]                   = useState<Stats | null>(null);
  const [registrations, setRegistrations]   = useState<Registration[]>([]);
  const [total, setTotal]                   = useState(0);
  const [page, setPage]                     = useState(1);
  const [search, setSearch]                 = useState("");
  const [statusFilter, setStatusFilter]     = useState("");
  const [loading, setLoading]               = useState(false);
  const [statsLoading, setStatsLoading]     = useState(false);
  const [listError, setListError]           = useState<string | null>(null);
  const [uploadTarget, setUploadTarget]     = useState<Registration | null>(null);
  const [deleteTarget, setDeleteTarget]     = useState<Registration | null>(null);

  const PAGE_SIZE = 20;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // ─── Auth token from session storage (simple persistence) ─────────────────
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_cert_token");
    if (stored) setToken(stored);
  }, []);

  const handleLogin = (t: string) => {
    sessionStorage.setItem("admin_cert_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_cert_token");
    setToken(null);
    setRegistrations([]);
    setStats(null);
  };

  // ─── Fetch stats ───────────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const res = await fetch("/api/admin/certificates/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { handleLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } finally {
      setStatsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ─── Fetch list ────────────────────────────────────────────────────────────
  const fetchList = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setListError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        ...(search       ? { search }       : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/admin/certificates?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { handleLogout(); return; }
      const data = await res.json();
      if (!res.ok) { setListError(data.error ?? "Failed to load."); return; }
      setRegistrations(data.registrations);
      setTotal(data.total);
    } catch {
      setListError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, search, statusFilter]);

  useEffect(() => {
    if (token) {
      fetchStats();
      fetchList();
    }
  }, [token, fetchStats, fetchList]);

  // ─── Search debounce ───────────────────────────────────────────────────────
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
    clearTimeout(searchTimeout.current);
  };

  // ─── Not logged in ─────────────────────────────────────────────────────────
  if (!token) return <LoginForm onLogin={handleLogin} />;

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#FFD700]/15 bg-[#080808] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
            <h1 className="font-serif text-xl font-light text-white">
              Certificate <span className="gold-gradient-text">Admin Dashboard</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ── Stats ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {statsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="neon-card p-6 h-24 animate-pulse bg-[#111]"
              />
            ))
          ) : (
            <>
              <StatCard
                icon={Users}
                label="Total Registrations"
                value={stats?.total ?? "—"}
                color="bg-[#FFD700]/10 border border-[#FFD700]/25 text-[#FFD700]"
              />
              <StatCard
                icon={Clock}
                label="Pending Certificates"
                value={stats?.pending ?? "—"}
                color="bg-orange-500/10 border border-orange-500/25 text-orange-400"
              />
              <StatCard
                icon={CheckCircle2}
                label="Available Certificates"
                value={stats?.available ?? "—"}
                color="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
              />
            </>
          )}
        </div>

        {/* ── Filters ────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
            <input
              id="admin-search-input"
              type="text"
              placeholder="Search by code, reg. number, or name…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="neon-input pl-10 text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#444]" />
            <select
              id="admin-status-filter"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="neon-input pl-9 pr-4 text-sm appearance-none w-full sm:w-44 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Available">Available</option>
            </select>
          </div>
          <button
            onClick={() => { fetchList(); fetchStats(); }}
            disabled={loading}
            className="btn-neon px-4 py-2.5 text-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div className="neon-card overflow-hidden">
          {listError && (
            <div className="p-6 flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">{listError}</span>
            </div>
          )}

          {/* Desktop table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[900px]">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {[
                    "Code",
                    "Reg. No.",
                    "Full Name",
                    "College",
                    "Workshop",
                    "Email",
                    "Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-[#555] font-bold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-[#444]">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </td>
                  </tr>
                )}
                {!loading && registrations.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-[#444]">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>No registrations found.</p>
                    </td>
                  </tr>
                )}
                <AnimatePresence>
                  {!loading &&
                    registrations.map((reg) => (
                      <motion.tr
                        key={reg.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-[#111] hover:bg-[#0a0a0a] transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-[#FFD700] whitespace-nowrap">
                          {reg.registration_code}
                        </td>
                        <td className="px-4 py-3 text-[#A8A8A8] whitespace-nowrap">
                          {reg.register_number}
                        </td>
                        <td className="px-4 py-3 text-white whitespace-nowrap max-w-[160px] truncate">
                          {reg.full_name}
                        </td>
                        <td className="px-4 py-3 text-[#777] max-w-[140px] truncate">
                          {reg.college_name}
                        </td>
                        <td className="px-4 py-3 text-[#777] max-w-[160px] truncate">
                          {reg.workshop_session}
                        </td>
                        <td className="px-4 py-3 text-[#666] max-w-[180px] truncate">
                          {reg.email}
                        </td>
                        <td className="px-4 py-3 text-[#555] whitespace-nowrap">
                          {formatDate(reg.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide border ${
                              reg.certificate_status === "Available"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                            }`}
                          >
                            {reg.certificate_status === "Available" ? (
                              <CheckCircle2 className="w-2.5 h-2.5" />
                            ) : (
                              <Clock className="w-2.5 h-2.5" />
                            )}
                            {reg.certificate_status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              id={`upload-btn-${reg.id}`}
                              onClick={() => setUploadTarget(reg)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all duration-200 ${
                                reg.certificate_status === "Available"
                                  ? "border-[#333] text-[#777] hover:border-[#FFD700]/50 hover:text-[#FFD700]"
                                  : "border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                              }`}
                            >
                              <Upload className="w-3 h-3" />
                              {reg.certificate_status === "Available"
                                ? "Replace"
                                : "Upload"}
                            </button>
                            <button
                              id={`delete-btn-${reg.id}`}
                              onClick={() => setDeleteTarget(reg)}
                              title="Delete registration"
                              aria-label={`Delete registration for ${reg.full_name}`}
                              className="p-1.5 rounded-lg border border-red-500/30 text-red-400/80 hover:text-red-400 hover:border-red-500/60 hover:bg-red-500/10 transition-all duration-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && total > 0 && (
            <div className="px-4 py-4 border-t border-[#111] flex items-center justify-between gap-4">
              <p className="text-[10px] text-[#444]">
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–
                {Math.min(page * PAGE_SIZE, total)} of {total} registrations
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="w-8 h-8 rounded-lg border border-[#222] text-[#666] hover:border-[#FFD700]/40 hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#555]">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="w-8 h-8 rounded-lg border border-[#222] text-[#666] hover:border-[#FFD700]/40 hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadTarget && (
          <UploadModal
            reg={uploadTarget}
            token={token}
            onClose={() => setUploadTarget(null)}
            onSuccess={() => {
              fetchList();
              fetchStats();
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            reg={deleteTarget}
            token={token}
            onClose={() => setDeleteTarget(null)}
            onSuccess={() => {
              if (registrations.length === 1 && page > 1) {
                setPage((p) => Math.max(1, p - 1));
              } else {
                fetchList();
              }
              fetchStats();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
