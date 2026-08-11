"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
}) {
  const paths = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    d: `M-${200 - i * 3 * position} -${100 + i * 4}C-${200 - i * 3 * position} -${100 + i * 4} -${150 - i * 3 * position} ${120 - i * 4} ${80 - i * 3 * position} ${180 - i * 4}C${300 - i * 3 * position} ${240 - i * 4} ${350 - i * 3 * position} ${400 - i * 4} ${350 - i * 3 * position} ${400 - i * 4}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.02,
  }));

  return (
    <div className={cn("w-full relative overflow-hidden", className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full text-slate-950 dark:text-white"
          viewBox="0 0 400 300"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.15 + path.id * 0.02}
              initial={{ pathLength: 0.3, opacity: 0.4 }}
              animate={{
                pathLength: 1,
                opacity: [0.2, 0.4, 0.2],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}