"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Phone, MessageSquare, User, Sparkles, Copy, Check } from "lucide-react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("imnotdivyansh@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      let res;
      try {
        res = await fetch(`${backendUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch {
        // Fallback to Next.js API route if standalone backend server is offline
        res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        // Direct FormSubmit API submission as fallback
        const fallbackRes = await fetch("https://formsubmit.co/ajax/imnotdivyansh@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject || `New Contact Message from ${formData.name}`,
            message: formData.message,
            _captcha: "false",
          }),
        });

        if (fallbackRes.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setStatus("idle"), 5000);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Failed to send email. Please try emailing imnotdivyansh@gmail.com directly.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your internet connection or email directly.");
    }
  };

  return (
    <section id="contact" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-r from-zinc-800/30 via-zinc-700/20 to-zinc-900/30 blur-[120px] rounded-full z-0" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-400 mb-4 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
          <span>Let's Connect</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
          Send Me a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">Message</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Have an exciting job opportunity, or question? Send a direct email to my inbox below.
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#0E0E11]/90 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700/80 p-1 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Divyansh Thakur" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-sans">Divyansh Thakur</h3>
                <p className="text-xs font-mono text-zinc-400">Full-Stack MERN Developer</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
              I am actively seeking software engineering roles, hackathon collaborations, and freelance opportunities. Feel free to reach out anytime!
            </p>

          </div>

          {/* Social Links & Availability */}
          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">Available for projects</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/divyanshthakur5552"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/nocapitsdiv?igsh=bThsMzh6OTU3YTFs&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-7 bg-[#0E0E11]/90 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono font-medium text-zinc-300">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono font-medium text-zinc-300">
                  Your Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-mono font-medium text-zinc-300">
                Subject <span className="text-zinc-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-mono font-medium text-zinc-300">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Divyansh, I'd like to discuss a project..."
                className="w-full p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans resize-none"
              />
            </div>

            {/* Status Notifications */}
            <AnimatePresence mode="wait">
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-950/60 border border-red-800/80 text-xs font-mono text-red-200"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-xs font-mono text-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Message sent successfully! I will get back to you shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-12 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 disabled:opacity-50 transition-all font-sans text-sm shadow-xl cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Sending Mail...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
