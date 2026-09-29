"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function Accordion({ question, answer, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#0D0D0D] border-[rgba(255,215,0,0.45)] shadow-[0_0_20px_rgba(255,215,0,0.08)]"
          : "bg-[#111111] border-[#222222] hover:border-[rgba(255,215,0,0.25)]"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span
          className={`text-sm font-medium pr-4 transition-colors duration-300 ${
            isOpen ? "text-[#FFD700]" : "text-white group-hover:text-[#FFD700]"
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-[#FFD700] bg-[rgba(255,215,0,0.1)] text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.2)]"
              : "border-[#333] text-[#666] group-hover:border-[rgba(255,215,0,0.4)] group-hover:text-[#FFD700]"
          }`}
        >
          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gradient-to-r from-[rgba(255,215,0,0.3)] to-transparent mb-4" />
              <p className="text-xs text-[#A8A8A8] leading-relaxed font-light">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
