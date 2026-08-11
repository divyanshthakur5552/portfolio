'use client';

import { LayoutTextFlip } from '@/components/ui/layout-text-flip';

interface ProfileHeaderProps {
  avatar: string;
  avatarAlt?: string;
  className?: string;
}

const ProfileHeader = ({
  avatar,
  avatarAlt = 'Profile Avatar',
  className = ''
}: ProfileHeaderProps) => {
  return (
    <div className={`flex items-stretch w-full min-h-[90px] ${className}`}>
      {/* Avatar Section */}
      <div className="relative flex-shrink-0 z-10 flex items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-zinc-700/50 p-1 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] shadow-xl">
          <img 
            src={avatar} 
            alt={avatarAlt}
            className="w-full h-full object-cover rounded-full ring-2 ring-zinc-800/30"
          />
        </div>
      </div>
      
      {/* Vertical Line Divider */}
      <div className="w-px bg-[#18181B] mx-4 z-10"></div>
      
      {/* Content Section */}
      <div className="flex flex-col flex-1 relative justify-center">
        {/* Top section - Role */}
        <div className="flex-1 flex items-end pb-2 relative z-10">
          <LayoutTextFlip
            text="I'm"
            words={["Problem Solver", "Software Developer", "Full Stack Engineer", "UI/UX Designer"]}
            duration={3000}
            className="text-sm md:text-base text-zinc-400 font-mono"
          />
        </div>
        
        {/* Horizontal divider line inside content */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#18181B] w-full"></div>
        
        {/* Bottom section - Name */}
        <div className="flex-1 flex items-start pt-2 relative z-10">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-bold font-sans tracking-tight">
              Divyansh Thakur
            </h1>
            <img 
              src="/blue-tick.png" 
              alt="Verified" 
              className="w-6 h-6 md:w-7 md:h-7 ml-3 opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
