"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code2, Sparkles, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";

export interface ProjectModalData {
  id: string;
  projectName: string;
  title: string;
  employmentType: string;
  dateRange: string;
  duration?: string;
  bullets: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageSrc?: string;
  description?: string;
}

interface ProgressiveBlurModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalData | null;
}

export const ProgressiveBlurModal: React.FC<ProgressiveBlurModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 sm:p-10">
          {/* Backdrop with Progressive Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0E0E11] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-zinc-400 hover:text-white hover:bg-black/90 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Banner Area */}
            <div className="relative w-full h-48 sm:h-60 bg-[#141417] overflow-hidden flex-shrink-0">
              {project.imageSrc ? (
                <>
                  <Image
                    src={project.imageSrc}
                    alt={project.projectName}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle Top & Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-[#0E0E11]/30 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#121216] to-[#1E1E24]">
                  <Trophy className="w-16 h-16 text-sky-400/40 animate-pulse" />
                </div>
              )}

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6 z-20">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-mono">
                    {project.employmentType}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.dateRange}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                  {project.projectName}
                </h2>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative text-zinc-300 font-sans custom-modal-scrollbar">
              {/* Bullet Points */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-bold">
                  Key Achievements & Highlights
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base leading-relaxed">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3 pt-2 border-t border-[#1F1F24]">
                <h4 className="text-xs uppercase tracking-wider font-mono text-zinc-400 font-bold">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#18181F] border border-[#27272A] text-xs font-mono text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1F1F24] flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-sky-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A20] hover:bg-[#24242C] border border-[#2E2E36] text-white font-semibold text-sm transition-all duration-200"
                  >
                    <SiGithub className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bottom Progressive Blur Mask */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0E0E11] to-transparent z-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
