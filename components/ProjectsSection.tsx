'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  FolderGit2,
  ExternalLink,
  Code2,
  ChevronsUpDown,
  Sparkles,
  ChevronDown,
  Maximize2,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { LinkPreview } from '@/components/ui/link-preview';
import { ProgressiveBlurModal, ProjectModalData } from '@/components/ui/progressive-blur-modal';

interface SubProject {
  title: string;
  bullets: string[];
}

interface ProjectRole {
  id: string;
  projectName: string;
  title: string;
  employmentType: string;
  dateRange: string;
  duration: string;
  bullets: string[];
  subProjects?: SubProject[];
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

const projectsData: OrganizationGroup[] = [
  {
    id: 'org-runnerup',
    name: 'Jarvis — Gen AI Hackathon',
    location: 'Runner Up',
    icon: Trophy,
    roles: [
      {
        id: 'role-jarvis',
        projectName: 'Jarvis',
        title: 'Frontend Developer',
        employmentType: 'Gen AI Hackathon - Runner Up',
        dateRange: 'Dec 2025',
        duration: 'Hackathon Sprint',
        bullets: [
          'Worked with React Native (Basic Knowledge) and React.js to develop responsive interfaces for AI-powered automation workflows.',
          'Collaborated with backend developers to integrate REST APIs and improve application functionality.',
          'Assisted in developing mobile-first interfaces using React Native and integrating backend APIs.',
        ],
        techStack: [
          'React.js',
          'React Native',
          'JavaScript',
          'REST APIs',
          'AI Automation',
          'Tailwind CSS',
        ],
        liveUrl: 'https://velvety-cendol-4736cd.netlify.app/',
        imageSrc: '/jarvis.png',
      },
    ],
  },
  {
    id: 'org-nayidisha',
    name: 'Nayidisha — Technicia’25 Hackathon',
    location: 'Technicia’25',
    icon: FolderGit2,
    roles: [
      {
        id: 'role-nayidisha',
        projectName: 'Nayidisha',
        title: 'Full-Stack Developer',
        employmentType: 'Technicia’25 Hackathon',
        dateRange: 'Apr 2025',
        duration: 'Hackathon Project',
        bullets: [
          'Built a responsive learning platform using React.js, Vite, Express.js, and RESTful APIs.',
          'Collaborated in an Agile team environment to develop AI-powered personalized learning features.',
          'Integrated frontend and backend services to deliver personalized learning paths and dynamic assessments.',
          'Contributed to feature implementation, testing, and debugging to improve user experience and application reliability.',
        ],
        techStack: [
          'React.js',
          'Vite',
          'Express.js',
          'Node.js',
          'RESTful APIs',
          'AI Personalized Learning',
          'Agile',
        ],
        liveUrl: 'https://nayidisha12.netlify.app/',
        imageSrc: '/nayidisha.png',
      },
    ],
  },
];

interface ProjectsSectionProps {
  showTitle?: boolean;
}

export default function ProjectsSection({ showTitle = true }: ProjectsSectionProps) {
  // Store expanded role IDs (default open both roles)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'role-jarvis': true,
    'role-nayidisha': true,
  });

  const [activeModalProject, setActiveModalProject] = useState<ProjectModalData | null>(null);

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
          Hackathons & Team Projects
        </h2>
      )}

      {/* Organization Groups Container */}
      <div className="space-y-8">
        {projectsData.map((group) => {
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
                    group.id === 'org-runnerup'
                      ? 'from-amber-300 to-yellow-400'
                      : 'from-orange-400 to-orange-500'
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
              <div className="relative ml-3.5 pl-6 border-l border-[#18181B] space-y-6">
                {group.roles.map((role) => {
                  const isExpanded = !!expandedIds[role.id];

                  return (
                    <div key={role.id} className="relative group/item z-10 hover:z-50">
                      {/* Left timeline dot indicator */}
                      <div className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-[#09090B] border-2 border-zinc-700 group-hover/item:border-sky-400 transition-colors"></div>

                      {/* Role Accordion Container */}
                      <div
                        className={`rounded-xl border transition-all duration-200 ${
                          isExpanded
                            ? 'bg-[#09090C] border-zinc-700 shadow-xl'
                            : 'bg-[#09090B] border-[#18181B] hover:border-zinc-700'
                        }`}
                      >
                        {/* Clickable Header */}
                        <button
                          onClick={() => toggleExpand(role.id)}
                          type="button"
                          className="w-full text-left p-4 md:p-5 flex flex-col gap-3 cursor-pointer select-none focus:outline-none"
                        >
                          <div className="flex items-center justify-between gap-4">
                            {/* Role Title & Icon */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#141417] border border-[#222226] text-zinc-400 flex-shrink-0">
                                <Code2 className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-base md:text-lg font-bold font-sans text-white group-hover/item:text-[#F7DF1E] transition-colors">
                                    {role.title}
                                  </h4>
                                  {role.liveUrl && (
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
                                  )}
                                  <span className="text-zinc-500">—</span>
                                  <span className="text-xs md:text-sm font-sans italic text-zinc-300">
                                    {role.employmentType}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Date & Chevron Toggle Icon */}
                            <div className="flex items-center gap-3">
                              <span className="text-xs md:text-sm font-mono text-zinc-400 italic whitespace-nowrap">
                                {role.dateRange}
                              </span>
                              <div className="p-1 rounded-md text-zinc-400 hover:text-white transition-colors">
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 transform rotate-180 transition-transform" />
                                ) : (
                                  <ChevronsUpDown className="w-4 h-4 text-zinc-500" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Collapsed Pill Stack Tags */}
                          {!isExpanded && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {role.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-0.5 rounded-full bg-[#121215] border border-[#1F1F24] text-[11px] md:text-xs font-mono text-zinc-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>

                        {/* Expanded Content with Smooth Animation */}
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

                                {/* Sub Projects if exists */}
                                {role.subProjects && role.subProjects.length > 0 && (
                                  <div className="space-y-3 my-4 pt-2">
                                    {role.subProjects.map((sub, sIdx) => (
                                      <div key={sIdx} className="bg-[#0D0D10] p-3.5 md:p-4 rounded-lg border border-[#1A1A1F]">
                                        <p className="text-xs md:text-sm font-mono font-semibold text-zinc-200 mb-2">
                                          {sub.title}
                                        </p>
                                        <ul className="space-y-1.5 text-xs md:text-sm font-sans text-zinc-400">
                                          {sub.bullets.map((sBullet, sbIdx) => (
                                            <li key={sbIdx} className="flex items-start gap-2">
                                              <span className="text-zinc-600 mt-1">•</span>
                                              <span>{sBullet}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Expanded Tech Stack Badges */}
                                <div className="flex flex-wrap items-center gap-2 pt-3 mb-4">
                                  {role.techStack.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2.5 py-1 rounded-full bg-[#121215] border border-[#222226] text-xs font-mono text-zinc-300"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                {/* Code & Live Demo Action Buttons */}
                                {(role.githubUrl || role.liveUrl) && (
                                  <div className="flex items-center gap-4 pt-3 border-t border-[#18181B]">
                                    {role.githubUrl && (
                                      <a
                                        href={role.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveModalProject(role);
                                      }}
                                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white bg-[#16161A] hover:bg-[#202026] border border-[#27272A] px-2.5 py-1 rounded transition-colors"
                                    >
                                      <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                                      <span>Modal View</span>
                                    </button>
                                  </div>
                                )}
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

      {/* Progressive Blur Modal Triggered on Demand */}
      <ProgressiveBlurModal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        project={activeModalProject}
      />
    </div>
  );
}
