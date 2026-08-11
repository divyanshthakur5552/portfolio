import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { useAnimate } from "framer-motion";

export const ClipPathLinks = () => {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-2 border border-[#18181B]">
        <LinkBox 
          Icon={FaInstagram} 
          href="https://www.instagram.com/your_instagram_handle" 
        />
        <LinkBox 
          Icon={FaGithub} 
          href="https://github.com/your_github_username" 
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

interface LinkBoxProps {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  imgSrc?: string;
  className?: string;
}

const LinkBox = ({ Icon, href, imgSrc, className }: LinkBoxProps) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    
    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as const,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as const,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as const,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as const,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-14 sm:h-16 md:h-20 place-content-center text-white bg-[#09090B] border-r border-[#18181B] last:border-r-0 min-w-0"
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="custom icon"
          className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
        />
      ) : (
        <Icon className="text-xl sm:text-3xl md:text-4xl flex-shrink-0" />
      )}
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white text-[#09090B] transition-colors duration-300"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="custom icon hover"
            className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
          />
        ) : (
          <Icon className="text-xl sm:text-3xl md:text-4xl flex-shrink-0" />
        )}
      </div>
    </a>
  );
};