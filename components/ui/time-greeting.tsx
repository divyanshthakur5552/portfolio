'use client';

import { useEffect, useState } from 'react';

interface TimeGreetingProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function TimeGreeting({ className = '' }: TimeGreetingProps) {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Good Morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    // Set initial greeting
    updateGreeting();

    // Update greeting every minute to handle time transitions
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering on server
  if (!greeting) {
    return <div className={className} style={{ visibility: 'hidden' }}>Good Morning</div>;
  }

  return (
    <h2 className={className}>
      {greeting}
    </h2>
  );
}
