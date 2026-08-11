"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Badge {
  id: string;
  label: string;
  color: string;
  size: "sm" | "md" | "lg";
  rotation: number;
  zIndex: number;
  offsetX: number;
  offsetY: number;
}

const defaultBadges: Badge[] = [
  {
    id: "fullstack",
    label: "Full-Stack Dev",
    color: "from-sky-400 to-blue-500",
    size: "lg",
    rotation: -3,
    zIndex: 1,
    offsetX: -120,
    offsetY: -35,
  },
  {
    id: "mern",
    label: "MERN Stack",
    color: "from-amber-300 to-yellow-400",
    size: "sm",
    rotation: 2,
    zIndex: 2,
    offsetX: 110,
    offsetY: -30,
  },
  {
    id: "nextjs",
    label: "React & Next.js",
    color: "from-cyan-300 to-blue-400",
    size: "lg",
    rotation: -2,
    zIndex: 3,
    offsetX: -60,
    offsetY: -10,
  },
  {
    id: "genai",
    label: "GenAI & LLMs",
    color: "from-pink-400 to-purple-400",
    size: "lg",
    rotation: 1,
    zIndex: 4,
    offsetX: 70,
    offsetY: 15,
  },
  {
    id: "apis",
    label: "REST APIs",
    color: "from-emerald-300 to-teal-400",
    size: "md",
    rotation: 3,
    zIndex: 5,
    offsetX: -90,
    offsetY: 35,
  },
  {
    id: "available",
    label: "Available for Hire",
    color: "from-zinc-200 to-zinc-400",
    size: "sm",
    rotation: -1,
    zIndex: 6,
    offsetX: 90,
    offsetY: 50,
  },
];

const sizeClasses = {
  sm: "px-4 py-1.5 text-xs sm:text-sm",
  md: "px-6 py-2 text-sm sm:text-base",
  lg: "px-7 py-2.5 text-base sm:text-lg",
};

interface MarketingBadgesProps {
  customBadges?: Badge[];
  className?: string;
}

export function MarketingBadges({ customBadges, className }: MarketingBadgesProps) {
  const badgeList = customBadges || defaultBadges;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setClickedId(clickedId === id ? null : id);
  };

  return (
    <div className={cn("relative flex h-[160px] sm:h-[180px] w-full items-center justify-center overflow-visible", className)}>
      {badgeList.map((badge) => {
        const isHovered = hoveredId === badge.id;
        const isClicked = clickedId === badge.id;
        const isOtherHovered = hoveredId !== null && hoveredId !== badge.id;

        return (
          <div
            key={badge.id}
            className={cn(
              "absolute cursor-pointer select-none rounded-full font-semibold transition-all duration-500 ease-out whitespace-nowrap",
              "bg-gradient-to-b shadow-lg",
              badge.color,
              sizeClasses[badge.size],
              "hover:shadow-2xl",
            )}
            style={{
              transform: `
                translate(${badge.offsetX}px, ${badge.offsetY}px) 
                rotate(${isHovered ? 0 : badge.rotation}deg)
                scale(${isClicked ? 1.15 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1})
                translateY(${isHovered ? -8 : 0}px)
              `,
              zIndex: isHovered || isClicked ? 100 : badge.zIndex,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 12px 24px -8px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                : isClicked
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 4px 10px -2px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
            }}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(badge.id)}
          >
            <span
              className={cn(
                "relative block transition-transform duration-300 font-sans tracking-tight",
                "text-slate-950 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]",
              )}
              style={{
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {badge.label}
            </span>
            {/* Inner highlight effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
