'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Award,
  BookOpen,
  BadgeCheck,
  ChevronsUpDown,
  Calendar,
  Building2,
} from 'lucide-react';

interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  dateRange: string;
  description: string;
  techTags: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Advanced Certification In Software Development With GenAI And DSA | C++ | IITM Pravartak',
    provider: 'Coding Ninjas, Online',
    dateRange: 'Mar 2026 - Present',
    description:
      'Completed an Advanced Certification in Software Development with GenAI and DSA from IITM Pravartak. Gained hands-on experience in C++ programming, Data Structures & Algorithms, Object-Oriented Programming, problem-solving, and Generative AI fundamentals.',
    techTags: ['C++', 'DSA', 'GenAI', 'OOP', 'Problem Solving', 'IITM Pravartak'],
    icon: GraduationCap,
  },
  {
    id: 'cert-2',
    title: 'React, Next.js, Context API, React Query, Redux, Tailwind, Advanced Patterns',
    provider: 'Udemy, Online',
    dateRange: 'Mar 2025 - May 2025',
    description:
      'Completed a comprehensive React development program covering modern React concepts from beginner to advanced level. Gained hands-on experience with Next.js, Context API, React Query, Redux, Tailwind CSS, state management, advanced React patterns, and responsive design.',
    techTags: ['React.js', 'Next.js', 'Context API', 'React Query', 'Redux', 'Tailwind CSS', 'Advanced Patterns'],
    icon: BadgeCheck,
  },
];

interface CertificationsSectionProps {
  showTitle?: boolean;
}

export default function CertificationsSection({ showTitle = true }: CertificationsSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'cert-1': true,
    'cert-2': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-4">
      {/* Title */}
      {showTitle && (
        <div className="flex items-baseline gap-2 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight">
            Certifications & Courses
          </h2>
          <span className="text-sm font-mono text-zinc-500 font-normal">
            ({certificationsData.length})
          </span>
        </div>
      )}

      {/* Main Borderless Container */}
      <div className="w-full border-t border-b border-[#18181B]">
        {certificationsData.map((item) => {
          const Icon = item.icon;
          const isExpanded = !!expandedIds[item.id];

          return (
            <div
              key={item.id}
              className="border-b border-[#18181B] last:border-b-0 group"
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="flex items-stretch cursor-pointer select-none hover:bg-[#121215]/50 transition-colors"
              >
                {/* Left Icon Column with Dashed Line */}
                <div className="w-14 sm:w-16 flex-shrink-0 flex items-center justify-center py-5 border-r border-dashed border-[#18181B]">
                  <div className="w-8 h-8 rounded-lg bg-[#141417] border border-[#222226] flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                    <Icon className="w-4 h-4 text-zinc-300 group-hover:text-[#F7DF1E] transition-colors" />
                  </div>
                </div>

                {/* Main Header Area */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 gap-2 sm:gap-4">
                  {/* Left Title & Provider */}
                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-bold font-sans text-white group-hover:text-[#F7DF1E] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-mono text-zinc-400">
                      <span className="text-sky-400 font-semibold">{item.provider}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{item.dateRange}</span>
                    </div>
                  </div>

                  {/* Right Icon Toggle */}
                  <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <ChevronsUpDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Body Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="pl-14 sm:pl-16 pr-4 sm:pr-6 pb-5 pt-1 border-t border-[#18181B]/60 space-y-3">
                      <p className="text-xs md:text-sm font-sans text-zinc-300 leading-relaxed pt-2">
                        {item.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded bg-[#121215] border border-[#222226] text-[11px] md:text-xs font-mono text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
