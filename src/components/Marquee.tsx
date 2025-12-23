'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number; // seconds for one full loop
    pauseOnHover?: boolean;
    className?: string;
}

export default function Marquee({
    children,
    direction = 'left',
    speed = 30,
    pauseOnHover = true,
    className = ''
}: MarqueeProps) {
    return (
        <div className={`group relative flex overflow-hidden ${className}`}>
            <div
                className={`flex min-w-full shrink-0 items-center justify-around gap-8 py-4 
                ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
                ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
            <div
                aria-hidden="true"
                className={`flex min-w-full shrink-0 items-center justify-around gap-8 py-4 
                ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
                ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {children}
            </div>
        </div>
    );
}
