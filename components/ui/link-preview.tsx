"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  placement?: 'top' | 'bottom';
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

function encodeParams(obj: Record<string, any>) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export const LinkPreview = ({
  children,
  url,
  className,
  width = 440,
  height = 260,
  quality = 95,
  layout = "fixed",
  placement = "bottom",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src: string;
  if (!isStatic) {
    const params = encodeParams({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 2.5,
      "viewport.height": height * 2.5,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  const isBottom = placement === "bottom";

  return (
    <div
      className="inline-block relative z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {isMounted ? (
        <div className="hidden">
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            priority={true}
            alt="hidden image"
          />
        </div>
      ) : null}

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        className={cn("inline-flex items-center text-white", className)}
      >
        {children}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 z-[9999] pointer-events-none",
              isBottom ? "top-full mt-3" : "bottom-full mb-3"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: isBottom ? -12 : 12, scale: 0.75 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: isBottom ? -8 : 8, scale: 0.75 }}
              className="shadow-2xl rounded-xl p-1.5 bg-[#121215] border border-[#27272A] max-w-[90vw]"
              style={{
                x: translateX,
                width: `${width}px`,
              }}
            >
              <div className="block p-1 bg-[#09090B] border border-zinc-800 shadow rounded-lg overflow-hidden">
                <Image
                  src={isStatic ? imageSrc : src}
                  width={width}
                  height={height}
                  quality={quality}
                  priority={true}
                  className="rounded-md object-cover w-full h-auto max-h-[300px]"
                  alt="link preview screenshot"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
