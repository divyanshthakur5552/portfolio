'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Code2,
  ChevronsUpDown,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { LinkPreview } from '@/components/ui/link-preview';

interface ProjectRole {
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
}

interface OrganizationGroup {
  id: string;
  name: string;
  location: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ProjectRole[];
}

const personalProjectsData: OrganizationGroup[] = [
  {
    id: 'org-replysens',
    name: 'Replysens — Individual SaaS Project',
    location: 'Jan 2025 – Present',
    icon: Zap,
    roles: [
      {
        id: 'role-replysens',
        projectName: 'Replysens.ai',
        title: 'Full-Stack Developer',
        employmentType: 'Individual SaaS Project',
        dateRange: 'Jan 2025 – Present',
        duration: 'Active Project',
        bullets: [
          'Built a business automation platform using React.js, Node.js, Express.js, MongoDB.',
          'Developed responsive analytics dashboards and RESTful APIs for WhatsApp automation.',
          'Designed a scalable MERN Stack architecture with caching, real-time insights, and automated customer workflows.',
        ],
        techStack: [
          'React.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'RESTful APIs',
          'WhatsApp Automation',
          'MERN Stack',
        ],
        githubUrl: 'https://github.com/divyanshthakur5552/replysens.ai',
      },
    ],
  },
  {
    id: 'org-guardian',
    name: 'Guardian AI — IoT Safety System',
    location: 'Feb 2025',
    icon: ShieldCheck,
    roles: [
      {
        id: 'role-guardian',
        projectName: 'Guardian AI',
        title: 'Full-Stack & IoT Developer',
        employmentType: 'IoT Safety System Project',
        dateRange: 'Feb 2025',
        duration: 'Feb 2025',
        bullets: [
          'Developed an IoT safety system using Node.js, MongoDB, and RESTful APIs for real-time sensor monitoring.',
          'Built an interactive React.js dashboard for alerts, data visualization, and predictive risk analysis.',
        ],
        techStack: [
          'React.js',
          'Node.js',
          'MongoDB',
          'RESTful APIs',
          'IoT Safety',
          'Data Visualization',
          'Predictive Risk',
        ],
      },
    ],
  },
];

interface PersonalProjectsSectionProps {
  showTitle?: boolean;
}

export default function PersonalProjectsSection({ showTitle = true }: PersonalProjectsSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'role-replysens': true,
    'role-guardian': true,
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight mb-8">
          Projects
        </h2>
      )}

      {/* Organization Groups Container */}
      <div className="space-y-8">
        {personalProjectsData.map((group) => {
          const GroupIcon = group.icon;
          return (
            <div key={group.id} className="relative">
              {/* Group Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-[#18181B]">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#141417] border border-[#222226] text-white">
                    <GroupIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold font-sans text-white tracking-tight">
                    {group.name}
                  </h3>
                </div>

                {/* Marketing Style Location Badge */}
                <div
                  className={`relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-sans font-bold text-xs select-none bg-gradient-to-b ${
                    group.id === 'org-replysens'
                      ? 'from-sky-300 to-sky-400'
                      : 'from-pink-300 to-pink-400'
                  } text-slate-950 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-white/30`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full opacity-50"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)',
                    }}
                  />
                  <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                    {group.location}
                  </span>
                  <span className="relative z-10 w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
                </div>
              </div>

              {/* Roles Container with vertical connector guide line */}
              <div className="relative pl-4 md:pl-6 space-y-4">
                {/* Vertical timeline connector line */}
                <div className="absolute left-[7px] md:left-[11px] top-3 bottom-3 w-px border-l border-dashed border-[#222226] pointer-events-none"></div>

                {group.roles.map((role) => {
                  const isExpanded = !!expandedIds[role.id];

                  return (
                    <div
                      key={role.id}
                      className="relative group/item z-10 hover:z-50"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[21px] md:-left-[29px] top-4 w-3.5 h-3.5 rounded-full bg-[#09090B] border-2 border-sky-400 flex items-center justify-center z-10">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                      </div>

                      {/* Card Container */}
                      <div
                        className={`rounded-lg bg-[#09090B] border transition-all duration-200 ${
                          isExpanded
                            ? 'border-[#27272A] shadow-lg shadow-black/40'
                            : 'border-[#18181B] hover:border-[#27272A]'
                        }`}
                      >
                        {/* Interactive Header Row */}
                        <div
                          onClick={() => toggleExpand(role.id)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 cursor-pointer select-none gap-3"
                        >
                          <div className="flex items-center justify-between w-full sm:w-auto">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#141417] border border-[#222226] text-zinc-400 flex-shrink-0">
                                <Code2 className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-base md:text-lg font-bold font-sans text-white group-hover/item:text-[#F7DF1E] transition-colors">
                                    {role.title}
                                  </h4>
                                  {role.liveUrl ? (
                                    <div onClick={(e) => e.stopPropagation()} className="relative z-50">
                                      <LinkPreview
                                        url={role.liveUrl}
                                        isStatic={!!role.imageSrc}
                                        imageSrc={role.imageSrc || ''}
                                        placement="bottom"
                                        width={440}
                                        height={260}
                                        className="font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                                      >
                                        <span className="flex items-center gap-1">
                                          {role.projectName}
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </span>
                                      </LinkPreview>
                                    </div>
                                  ) : (
                                    <span className="font-semibold text-sky-400">
                                      {role.projectName}
                                    </span>
                                  )}
                                  <span className="text-zinc-500">—</span>
                                  <span className="text-xs md:text-sm font-sans italic text-zinc-300">
                                    {role.employmentType}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Mobile Chevron */}
                            <div className="sm:hidden text-zinc-400">
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-white' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Date Range & Chevron */}
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="text-right">
                              <p className="text-xs md:text-sm font-mono text-zinc-300">
                                {role.dateRange}
                              </p>
                              {role.duration && (
                                <p className="text-[11px] font-mono text-zinc-500">
                                  {role.duration}
                                </p>
                              )}
                            </div>

                            <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded text-zinc-400 group-hover/item:text-white transition-colors">
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-white' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                              <div className="px-4 md:px-6 pb-5 pt-1 border-t border-[#18181B]">
                                {/* Main Bullets */}
                                <ul className="space-y-2 mb-4 text-xs md:text-sm font-sans text-zinc-300 leading-relaxed pt-3">
                                  {role.bullets.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                      <span className="text-zinc-500 mt-1">•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>

                                {/* Tech Stack Tags */}
                                <div className="pt-3 border-t border-[#141417] flex flex-wrap items-center justify-between gap-3">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {role.techStack.map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded bg-[#121215] border border-[#222226] text-[11px] md:text-xs font-mono text-zinc-300"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Action Links */}
                                  {(role.githubUrl || role.liveUrl) && (
                                    <div className="flex items-center gap-3 pt-2 sm:pt-0">
                                      {role.githubUrl && (
                                        <a
                                          href={role.githubUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                                        >
                                          <SiGithub className="w-3.5 h-3.5" />
                                          <span>Code</span>
                                        </a>
                                      )}
                                      {role.liveUrl && (
                                        <div onClick={(e) => e.stopPropagation()} className="relative z-50">
                                          <LinkPreview
                                            url={role.liveUrl}
                                            isStatic={!!role.imageSrc}
                                            imageSrc={role.imageSrc || ''}
                                            placement="top"
                                            width={440}
                                            height={260}
                                            className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                                          >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Live Demo</span>
                                          </LinkPreview>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
