"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  // Create structured diagonal paths
  const generatePaths = () => {
    const paths = [];
    
    // Diagonal lines from top-left to bottom-right
    for (let i = 0; i < 12; i++) {
      const startX = -200 + (i * 80);
      const endX = startX + 600;
      paths.push(`M${startX} 0L${endX} 400`);
    }
    
    // Diagonal lines from top-right to bottom-left  
    for (let i = 0; i < 12; i++) {
      const startX = 1000 - (i * 80);
      const endX = startX - 600;
      paths.push(`M${startX} 0L${endX} 400`);
    }
    
    return paths;
  };

  const paths = generatePaths();

  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Static background grid */}
        {paths.map((path, index) => (
          <path
            key={`static-${index}`}
            d={path}
            stroke="#27272A"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        ))}
        
        {/* Animated beams - select fewer for animation */}
        {paths.filter((_, index) => index % 3 === 0).map((path, index) => (
          <motion.path
            key={`animated-${index}`}
            d={path}
            stroke={`url(#beam-gradient-${index})`}
            strokeOpacity="1"
            strokeWidth="2"
            strokeDasharray="100 300"
            initial={{ strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: -400
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          />
        ))}
        
        <defs>
          {paths.filter((_, index) => index % 3 === 0).map((_, index) => (
            <linearGradient
              id={`beam-gradient-${index}`}
              key={`gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="40%" stopColor="#18CCFC" stopOpacity="1" />
              <stop offset="60%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";