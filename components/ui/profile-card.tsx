"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Copy, Zap, Check, Phone } from "lucide-react";

interface ComponentProps {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  avatarSrc?: string;
  statusText?: string;
  statusColor?: string; 
  glowText?: string; 
  className?: string;
}

export default function ProfileCard({
  name = "Divyansh Thakur",
  role = "Full-Stack Developer",
  email = "imnotdivyansh@gmail.com",
  phone = "+91 8352986476",
  avatarSrc = "/logo.png",
  statusText = "Available for work",
  statusColor = "bg-lime-500",
  glowText = "Currently High on Innovation",
  className,
}: ComponentProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Derive a local clock text once per minute
  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1500);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 1500);
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("relative w-full max-w-2xl mx-auto mt-4 mb-10", className)}
    >
      {/* Background Lime Glow */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-8 top-[70%] rounded-[28px] bg-lime-400/80 blur-xl shadow-[0_40px_80px_-16px_rgba(163,230,53,0.8)] z-0" />

      {/* Bottom Glow Text Bar */}
      <div className="absolute inset-x-0 -bottom-8 mx-auto w-full z-0">
        <div className="flex items-center justify-center gap-2 bg-transparent py-2.5 text-center text-xs sm:text-sm font-semibold text-black">
          <Zap className="h-4 w-4" /> {glowText}
        </div>
      </div>

      {/* Card Content */}
      <Card className="relative z-10 mx-auto w-full overflow-visible rounded-[28px] border border-[#27272A] bg-[radial-gradient(120%_120%_at_30%_10%,#1a1a1a_0%,#0f0f10_60%,#0b0b0c_100%)] text-white shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          {/* Header Status & Clock */}
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-full animate-pulse", statusColor)} />
              <span className="select-none font-mono">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80 font-mono">
              <Clock className="h-4 w-4 text-sky-400" />
              <span className="tabular-nums">{timeText}</span>
            </div>
          </div>

          {/* Avatar & User Details */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 bg-zinc-900 p-1 flex items-center justify-center">
              <img
                src={avatarSrc}
                alt={`${name} avatar`}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl sm:text-2xl font-bold tracking-tight font-sans text-white">
                {name}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm font-mono text-neutral-400">{role}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full h-12 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all font-mono px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer select-none"
            >
              {copiedEmail ? <Check className="h-4 w-4 text-lime-400 shrink-0" /> : <Copy className="h-4 w-4 text-sky-400 shrink-0" />}
              <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="w-full h-12 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all font-mono px-4 text-xs sm:text-sm whitespace-nowrap cursor-pointer select-none"
            >
              {copiedPhone ? <Check className="h-4 w-4 text-lime-400 shrink-0" /> : <Phone className="h-4 w-4 text-emerald-400 shrink-0" />}
              <span>{copiedPhone ? "Copied Phone!" : "Copy Phone No"}</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
