"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Download, ArrowUp } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { MarketingBadges } from "@/components/ui/marketing-badges";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Grey Palette)
// -------------------------------------------------------------------------
const STYLES = `
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

/* Crisp 1px Dark Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: radial-gradient(circle at 50% 50%, black 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, black 60%, transparent 100%);
}

/* Grey Glow Aurora */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(161, 161, 170, 0.12) 0%, 
    rgba(82, 82, 91, 0.06) 45%, 
    transparent 75%
  );
}

/* Giant background watermark */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-white">Full-Stack Developer</span> <span className="text-zinc-500">✦</span>
    <span className="text-white">MERN Stack Architecture</span> <span className="text-zinc-500">✦</span>
    <span className="text-white">React & Next.js</span> <span className="text-zinc-500">✦</span>
    <span className="text-white">GenAI Workflows</span> <span className="text-zinc-500">✦</span>
    <span className="text-white">RESTful APIs & Microservices</span> <span className="text-zinc-500">✦</span>
  </div>
);

export function CinematicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div
        className="relative w-full bg-[#09090B] border-t border-[#18181B] overflow-hidden"
      >
        <footer className="relative flex flex-col justify-between overflow-hidden bg-[#09090B] text-white py-16 px-4 md:px-8">
          
          {/* Grey Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div className="footer-giant-bg-text absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-sans font-black">
            DEVELOPER
          </div>

          {/* 1. Diagonal Full-Width Angled Marquee Ribbon */}
          <div className="relative -mx-[50vw] left-1/2 right-1/2 w-screen overflow-hidden border-y border-[#27272A] bg-[#0E0E11]/95 backdrop-blur-md py-4.5 z-10 my-8 shadow-2xl -rotate-2 scale-105">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-white uppercase font-mono">
              <MarqueeItem />
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div
            className="relative z-10 flex flex-1 flex-col items-center justify-center my-8 w-full max-w-4xl mx-auto text-center space-y-8"
          >
            {/* Interactive Layered Marketing Badges */}
            <MarketingBadges className="my-2" />

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-sans leading-tight">
              Let's build something <span className="text-white underline decoration-zinc-600 underline-offset-8">great together.</span>
            </h2>

            {/* Single Download Resume Shiny CTA Button */}
            <div className="pt-4">
              <ShinyButton
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-2xl hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5 text-white" />
                <span>Download Resume</span>
              </ShinyButton>
            </div>
          </div>

          {/* 3. Bottom Credit Bar */}
          <div className="relative z-20 w-full max-w-4xl mx-auto pt-8 border-t border-[#18181B] flex items-center justify-between gap-4">
            <div className="text-white text-xs sm:text-sm font-mono">
              © {new Date().getFullYear()} All rights reserved.
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141417] hover:bg-[#1F1F24] border border-[#27272A] hover:border-zinc-400 flex items-center justify-center text-white transition-colors shadow-lg group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 text-white" />
            </MagneticButton>
          </div>

        </footer>
      </div>
    </>
  );
}
