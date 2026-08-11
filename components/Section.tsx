'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: ReactNode;
}

export default function Section({ children, className = '', background }: SectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background - constrained within section */}
      {background && (
        <div className="absolute inset-0">
          {background}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}