"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextBlockAnimationProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  duration?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0.1,
  blockColor = "#38bdf8",
  duration = 0.6,
  direction = "left",
  className,
}: TextBlockAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const shouldAnimate = animateOnScroll ? isInView : true;
  const isLeft = direction === "left";

  const origins = isLeft
    ? ["left center", "left center", "right center", "right center"]
    : ["right center", "right center", "left center", "left center"];

  return (
    <div ref={ref} className={cn("relative inline-block overflow-hidden py-1", className)}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldAnimate ? 1 : 0 }}
        transition={{ duration: 0.01, delay: delay + duration * 0.4 }}
      >
        {children}
      </motion.div>

      {/* Revealer Block */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none rounded-sm"
        style={{ backgroundColor: blockColor }}
        initial={{ scaleX: 0, transformOrigin: origins[0] }}
        animate={
          shouldAnimate
            ? {
                scaleX: [0, 1, 1, 0],
                transformOrigin: origins,
              }
            : { scaleX: 0 }
        }
        transition={{
          duration: duration * 1.4,
          delay: delay,
          times: [0, 0.45, 0.55, 1],
          ease: [0.77, 0, 0.175, 1],
        }}
      />
    </div>
  );
}
