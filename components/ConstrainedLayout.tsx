'use client';

import { ReactNode } from 'react';

interface ConstrainedLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ConstrainedLayout({ children, className = '' }: ConstrainedLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#09090B] flex justify-center">
      {/* Constrained Content Area with Vertical Lines */}
      <div className="relative w-full max-w-[800px] ml-[9px]">
        {/* Vertical Lines - fixed at edges of content */}
        <div className="fixed top-0 bottom-0 w-px bg-[#18181B] pointer-events-none z-50" style={{ left: 'calc(50vw - 407px)' }}></div>
        <div className="fixed top-0 bottom-0 w-px bg-[#18181B] pointer-events-none z-50" style={{ left: 'calc(50vw + 392px)' }}></div>
        
        <div className={`relative z-10 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}