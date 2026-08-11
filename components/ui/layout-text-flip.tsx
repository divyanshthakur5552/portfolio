"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className = "",
}: {
  text?: string;
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {text && (
        <motion.span
          layoutId="subtext"
          className="text-sm md:text-base text-zinc-500"
        >
          {text}
        </motion.span>
      )}
      <motion.span
        layout
        className="relative inline-block overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -20, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{ y: 20, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap text-sm md:text-base text-white")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
};
