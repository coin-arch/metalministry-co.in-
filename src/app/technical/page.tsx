import React from 'react';
import { Metadata } from 'next';
import TechnicalContent from '@/components/TechnicalContent';

export const metadata: Metadata = {
    title: "Technical Data | Metal Ministry Inc.",
    description: "Technical specifications, chemical compositions, and mechanical properties charts for Stainless Steel and Nickel Alloys.",
};

export default function TechnicalPage() {
    return <TechnicalContent />;
}
