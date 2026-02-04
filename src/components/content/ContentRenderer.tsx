'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Type definitions matching the migrate-full-content.js output
export type ContentBlock =
    | { type: 'heading'; level: number; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; listType: 'unordered' | 'ordered'; items: string[] }
    | { type: 'image'; src: string; alt: string; caption?: string }
    | { type: 'table'; rows: { text: string; tag: 'th' | 'td'; rowSpan?: number; colSpan?: number; align?: string }[][] }
    | { type: 'accordion'; items: { title: string; body: ContentBlock[] }[] }
    | { type: 'section'; variant: 'summary'; title: string; content: string };

interface ContentRendererProps {
    blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
            {blocks.map((block, index) => (
                <React.Fragment key={index}>
                    {renderBlock(block, index)}
                </React.Fragment>
            ))}
        </div>
    );
}

const ImageBlock = ({ block }: { block: ContentBlock & { type: 'image' } }) => {
    const [src, setSrc] = useState<string>(() => {
        let initialSrc = block.src || '';
        if (initialSrc.startsWith('img/')) {
            initialSrc = `/images/${initialSrc.replace('img/', '')}`;
        } else if (initialSrc.startsWith('assets/')) {
            initialSrc = `/assets/${initialSrc.replace('assets/', '')}`;
        } else if (!initialSrc.startsWith('/') && !initialSrc.startsWith('http')) {
            initialSrc = `/${initialSrc}`;
        }
        return initialSrc;
    });

    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="w-full h-64 bg-gray-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center text-gray-400">
                <span className="text-sm font-medium">{block.alt || 'Image not available'}</span>
            </div>
        );
    }

    return (
        <div className="my-8 relative rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800">
            <div className="relative h-[400px] w-full">
                <Image
                    src={src}
                    alt={block.alt || 'Product Image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                    onError={() => setHasError(true)}
                />
            </div>
            {block.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white text-sm">
                    {block.caption}
                </div>
            )}
        </div>
    );
};

function renderBlock(block: ContentBlock, index: number) {
    switch (block.type) {
        case 'heading':
            const Tag = `h${block.level}` as React.ElementType;
            // Map levels to Tailwind classes
            const sizes: Record<number, string> = {
                1: 'text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white',
                2: 'text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white',
                3: 'text-xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-100',
                4: 'text-lg font-semibold mt-4 mb-2',
                5: 'text-base font-semibold mt-2 mb-1',
                6: 'text-sm font-semibold mt-2 mb-1',
            };
            return <Tag key={index} className={sizes[block.level] || sizes[2]}>{block.text}</Tag>;

        case 'paragraph':
            return <p key={index} className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.text }} />;

        case 'list':
            const ListTag = block.listType === 'ordered' ? 'ol' : 'ul';
            return (
                <ListTag key={index} className={`pl-5 mb-4 space-y-1 ${block.listType === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
                    {block.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ListTag>
            );

        case 'image':
            return <ImageBlock key={index} block={block} />;

        case 'table':
            return (
                <div key={index} className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {block.rows.map((row, rIndex) => (
                                <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                                    {row.map((cell, cIndex) => {
                                        const CellTag = cell.tag as React.ElementType;
                                        return (
                                            <CellTag
                                                key={cIndex}
                                                colSpan={cell.colSpan}
                                                rowSpan={cell.rowSpan}
                                                className={`px-4 py-3 text-sm border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${cell.tag === 'th' ? 'font-bold bg-gray-100 dark:bg-gray-700 text-left' : ''
                                                    }`}
                                            // align attribute is deprecated in HTML5, handling via class? relying on parent style for now
                                            >
                                                {cell.text}
                                            </CellTag>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'accordion':
            return (
                <div key={index} className="space-y-2 my-6">
                    {block.items.map((item, i) => (
                        <details key={i} className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <summary className="flex items-center justify-between p-4 font-medium cursor-pointer bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 transition-colors list-none">
                                {item.title}
                                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                                {/* Recursive rendering! */}
                                <ContentRenderer blocks={item.body} />
                            </div>
                        </details>
                    ))}
                </div>
            );

        case 'section':
            if (block.variant === 'summary') {
                return (
                    <div key={index} className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">{block.title}</h4>
                        <div dangerouslySetInnerHTML={{ __html: block.content }} />
                    </div>
                );
            }
            return null;

        default:
            return null;
    }
}
