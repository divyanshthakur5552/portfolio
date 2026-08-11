"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative mt-1 mr-2 text-base sm:text-lg md:text-xl font-mono leading-relaxed">
      <span className="absolute opacity-20 text-zinc-500 select-none">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text, className }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={`flex flex-wrap ${className || ""}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};
