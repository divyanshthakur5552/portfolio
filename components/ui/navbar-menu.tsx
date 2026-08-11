"use client";
import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  href?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(children ? item : null)} className="relative">
      {href ? (
        <a
          href={href}
          onClick={() => setActive(null)}
          className="cursor-pointer text-zinc-300 hover:text-white transition-colors text-sm font-medium py-1 px-3 rounded-full hover:bg-zinc-800/50 block"
        >
          {item}
        </a>
      ) : (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-zinc-300 hover:text-white transition-colors text-sm font-medium py-1 px-3 rounded-full hover:bg-zinc-800/50"
        >
          {item}
        </motion.p>
      )}
      {children && active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-[#121215]/95 dark:bg-[#121215]/95 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className={`relative rounded-full border border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md shadow-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${className || ""}`}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-3 group p-1.5 rounded-xl hover:bg-zinc-800/40 transition-colors">
      {src && (
        <img
          src={src}
          width={100}
          height={60}
          alt={title}
          className="shrink-0 rounded-lg shadow-lg object-cover w-20 h-14"
        />
      )}
      <div>
        <h4 className="text-sm font-semibold mb-0.5 text-white group-hover:text-zinc-200 transition-colors">
          {title}
        </h4>
        <p className="text-zinc-400 text-xs max-w-[12rem] line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, className, ...rest }: any) => {
  return (
    <a
      {...rest}
      className={`text-zinc-400 hover:text-white transition-colors text-sm font-medium ${className || ""}`}
    >
      {children}
    </a>
  );
};
