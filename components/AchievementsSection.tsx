'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Crown,
  Sparkles,
  ChevronsUpDown,
} from 'lucide-react';

interface AchievementItem {
  id: string;
  title: string;
  prize: string;
  category: string;
  organizer: string;
  date?: string;
  icon: React.ComponentType<{ className?: string }>;
  details?: string;
}

const achievementsData: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Gen AI Hackathon',
    prize: 'Runner Up',
    category: 'National Level',
    organizer: 'Supported by GDC & ML Chandigarh',
    date: '12.2025',
    icon: Trophy,
    details: 'National level hackathon focused on building generative AI workflows and full-stack AI automation solutions.',
  },
  {
    id: 'ach-2',
    title: 'Saviskar Hackathon',
    prize: 'Runner Up',
    category: 'Mobile App Development',
    organizer: 'Organized by CGC JNH',
    date: '2025',
    icon: Award,
    details: 'Secured 2nd place for building cross-platform mobile application prototypes with real-time API integrations.',
  },
  {
    id: 'ach-3',
    title: 'Hack Heist Competition',
    prize: 'First Place',
    category: 'Web Design',
    organizer: 'Organized by CGC Landran',
    date: '2024',
    icon: Crown,
    details: 'Secured 1st position for designing and developing a highly responsive, modern web application UI.',
  },
  {
    id: 'ach-4',
    title: 'Parivarta AI Fateh',
    prize: 'First Place',
    category: 'AI-powered Web Design',
    organizer: 'Organized by CGC Landran',
    date: '2024',
    icon: Sparkles,
    details: 'Won 1st place for creating an AI-driven web application featuring personalized learning and automated workflows.',
  },
];

interface AchievementsSectionProps {
  showTitle?: boolean;
}

export default function AchievementsSection({ showTitle = true }: AchievementsSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'ach-1': true,
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
            Achievements
          </h2>
          <span className="text-sm font-mono text-zinc-500 font-normal">
            ({achievementsData.length})
          </span>
        </div>
      )}

      {/* Main Borderless Table Container matching screenshot */}
      <div className="w-full border-t border-b border-[#18181B]">
        {achievementsData.map((item) => {
          const Icon = item.icon;
          const isExpanded = !!expandedIds[item.id];

          return (
            <div
              key={item.id}
              className="border-b border-[#18181B] last:border-b-0 group"
            >
              {/* Row Container */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="flex items-stretch cursor-pointer select-none hover:bg-[#121215]/50 transition-colors"
              >
                {/* Left Icon Square Column */}
                <div className="w-14 sm:w-16 flex-shrink-0 flex items-center justify-center py-4 border-r border-dashed border-[#18181B]">
                  <div className="w-8 h-8 rounded-lg bg-[#141417] border border-[#222226] flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                    <Icon className="w-4 h-4 text-zinc-300 group-hover:text-sky-400 transition-colors" />
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 gap-2 sm:gap-4">
                  {/* Left Title & Meta */}
                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-bold font-sans text-white group-hover:text-[#F7DF1E] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-mono text-zinc-400">
                      <span className="text-sky-400 font-semibold">{item.prize}</span>
                      <span className="text-zinc-600">|</span>
                      <span>{item.category}</span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-300">{item.organizer}</span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {item.date && (
                      <span className="text-xs font-mono text-zinc-500">
                        {item.date}
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <ChevronsUpDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Details */}
              <AnimatePresence initial={false}>
                {isExpanded && item.details && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="pl-14 sm:pl-16 pr-4 sm:pr-6 py-3 bg-[#0D0D10]/60 border-t border-[#18181B] text-xs md:text-sm font-mono text-zinc-400 leading-relaxed">
                      <p>{item.details}</p>
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
