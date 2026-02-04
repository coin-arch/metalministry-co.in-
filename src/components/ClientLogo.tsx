'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ClientLogoProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ClientLogo({ src, alt, className }: ClientLogoProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        // Simple fallback or null
        return (
            <div className={`flex items-center justify-center bg-gray-50 border border-gray-100 rounded text-xs text-gray-400 font-medium ${className}`}>
                {alt}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={className}
            onError={() => setHasError(true)}
        />
    );
}
