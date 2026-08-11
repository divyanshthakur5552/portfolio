'use client';

import React from 'react';

interface HorizontalDividerProps {
  /**
   * Number of vertical lines to display
   * @default 5
   */
  lineCount?: number;
  
  /**
   * Space between vertical lines in pixels
   * @default 120
   */
  spacing?: number;
  
  /**
   * Height of vertical lines in pixels
   * @default 24
   */
  lineHeight?: number;
  
  /**
   * Color of the lines
   * @default '#18181B'
   */
  color?: string;
  
  /**
   * Width of the lines in pixels
   * @default 2
   */
  lineWidth?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function HorizontalDivider({
  lineCount = 5,
  spacing = 120,
  lineHeight = 24,
  color = '#18181B',
  lineWidth = 2,
  className = ''
}: HorizontalDividerProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Horizontal line */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen"
        style={{
          height: `${lineWidth}px`,
          backgroundColor: color
        }}
      />
      
      {/* Vertical lines container */}
      <div className="relative flex items-center justify-center gap-0" style={{ height: `${lineHeight}px` }}>
        {Array.from({ length: lineCount }).map((_, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              width: `${lineWidth}px`,
              height: `${lineHeight}px`,
              backgroundColor: color,
              left: `calc(50% + ${(index - Math.floor(lineCount / 2)) * spacing}px)`,
              transform: 'translateX(-50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
