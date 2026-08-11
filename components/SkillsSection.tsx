'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Code2,
  Sparkles,
  Layers,
  BarChart3,
  FileText,
  Cpu,
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiGit,
  SiGithub,
  SiVercel,
  SiCplusplus,
  SiPython,
} from 'react-icons/si';

// Custom clean SVG icons for branding to prevent missing exports across different react-icons versions
const PhotoshopIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6.2 3.8H6.5v6.4h1.4v-2.4h1.3c1.1 0 1.8-.6 1.8-2s-.7-2-1.8-2zm-.1 2.8H7.9V9.9h1.3c.4 0 .7.2.7.8s-.3.9-.7.9zm6.6.1c-.7 0-1.1.2-1.4.6l.9.9c.2-.2.5-.4.8-.4.3 0 .5.1.5.4 0 .2-.2.4-.7.6-1 .3-1.5.7-1.5 1.6 0 1 .7 1.6 1.7 1.6.7 0 1.2-.3 1.5-.7l-.9-.9c-.2.2-.5.4-.8.4-.3 0-.5-.1-.5-.4 0-.3.2-.4.8-.6 1-.3 1.4-.7 1.4-1.6 0-1-.7-1.5-1.8-1.5z" />
  </svg>
);

const ClaudeIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
  </svg>
);

const CursorIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.64 21.97C13.14 22.21 12.54 22.01 12.3 21.51L9.73 16.14L6.15 19.72C5.68 20.19 4.88 19.86 4.88 19.19V4.5C4.88 3.83 5.68 3.5 6.15 3.97L18.47 16.29C18.94 16.76 18.61 17.56 17.94 17.56H13.62L16.19 22.93C16.43 23.43 16.23 24.03 15.73 24.27L13.64 21.97Z" />
  </svg>
);

const PostgresIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
  </svg>
);

const RedisIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L2 7.5v9L12 21l10-4.5v-9L12 3zm0 2.3l6.8 3.1L12 11.5 5.2 8.4 12 5.3zm-8 4.7l7 3.2v6.5l-7-3.2V10zm16 6.5l-7 3.2v-6.5l7-3.2v6.5z" />
  </svg>
);

const DockerIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 4h3v3h-3V4zm-4 0h3v3H9V4zm-4 0h3v3H5V4zm-4 4h3v3H1V8zm4 0h3v3H5V8zm4 0h3v3H9V8zm4 0h3v3h-3V8zm4 0h3v3h-3V8zM1 12h22c0 5-4 9-11 9S1 17 1 12z" />
  </svg>
);

const FigmaIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 2h4v4H8V2zm0 6h4v4H8V8zm0 6h4v4a2 2 0 1 1-4-2v-2zm6-12h4v4h-4V2zm0 6h4a2 2 0 1 1-4 2V8z" />
  </svg>
);

const ChatGPTIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
  </svg>
);

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const stackData: SkillCategory[] = [
  {
    id: '01',
    title: 'Language',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
    ],
  },
  {
    id: '02',
    title: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'shadcn/ui', icon: Layers, color: '#FFFFFF' },
      { name: 'Radix UI', icon: Layers, color: '#FFFFFF' },
      { name: 'Base UI', icon: Layers, color: '#A1A1AA' },
      { name: 'Motion', icon: Sparkles, color: '#E11D48' },
      { name: 'Expo', icon: Code2, color: '#FFFFFF' },
      { name: 'TanStack', icon: Code2, color: '#FF4154' },
      { name: 'MobX-State-Tree', icon: Cpu, color: '#FF9955' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    id: '03',
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Bun', icon: Terminal, color: '#FBF0DF' },
      { name: 'PostgreSQL', icon: PostgresIcon, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: RedisIcon, color: '#DC382D' },
      { name: 'nginx', icon: Terminal, color: '#009639' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
      { name: 'REST APIs', icon: Terminal, color: '#38BDF8' },
    ],
  },
  {
    id: '04',
    title: 'Workflow & AI',
    skills: [
      { name: 'Claude', icon: ClaudeIcon, color: '#D97757' },
      { name: 'Cursor', icon: CursorIcon, color: '#38BDF8' },
      { name: 'Gemini', icon: Sparkles, color: '#4285F4' },
      { name: 'ChatGPT', icon: ChatGPTIcon, color: '#10A37F' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
      { name: 'Docker', icon: DockerIcon, color: '#2496ED' },
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    ],
  },
  {
    id: '05',
    title: 'Analytics',
    skills: [
      { name: 'OpenPanel', icon: BarChart3, color: '#38BDF8' },
      { name: 'PostHog', icon: BarChart3, color: '#F54E00' },
    ],
  },
  {
    id: '06',
    title: 'Design',
    skills: [
      { name: 'Figma', icon: FigmaIcon, color: '#F24E1E' },
      { name: 'Paper', icon: FileText, color: '#A1A1AA' },
      { name: 'Photoshop', icon: PhotoshopIcon, color: '#31A8FF' },
    ],
  },
];

import TextBlockAnimation from '@/components/ui/text-block-animation';

interface SkillsSectionProps {
  showTitle?: boolean;
}

export default function SkillsSection({ showTitle = true }: SkillsSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-4">
      {/* Title */}
      {showTitle && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight mb-6 md:mb-8">
          Stack
        </h2>
      )}

      {/* Main Content - Table container box removed */}
      <div className="w-full border-t border-b border-[#18181B]">
        {stackData.map((category, idx) => (
          <TextBlockAnimation
            key={category.id}
            blockColor={idx % 2 === 0 ? "#38bdf8" : "#F7DF1E"}
            delay={idx * 0.08}
            duration={0.5}
            direction={idx % 2 === 0 ? "left" : "right"}
            className="w-full border-b border-[#18181B] last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row w-full">
              {/* Category Column */}
              <div className="w-full sm:w-56 md:w-64 flex-shrink-0 flex items-center gap-3 px-3 md:px-5 py-4 border-b sm:border-b-0 sm:border-r border-dashed border-[#18181B]">
                <span className="text-zinc-500 font-mono text-sm md:text-base font-semibold">
                  {category.id}
                </span>
                <span className="text-zinc-200 font-mono text-sm md:text-base font-medium">
                  {category.title}
                </span>
              </div>

              {/* Badges Column */}
              <div className="flex-1 flex flex-wrap items-center gap-2 md:gap-2.5 p-3.5 md:p-5">
                {category.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-[#222226] hover:border-zinc-500 hover:bg-[#18181F] transition-all duration-200 group cursor-default shadow-sm hover:-translate-y-0.5"
                    >
                      <SkillIcon
                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0"
                        style={skill.color ? { color: skill.color } : undefined}
                      />
                      <span className="text-xs md:text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TextBlockAnimation>
        ))}
      </div>
    </div>
  );
}


