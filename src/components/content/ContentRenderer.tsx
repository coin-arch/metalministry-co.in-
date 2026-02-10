import React from 'react';

// Basic renderer for Supabase structured content (JSON)
// Adjust types based on your actual data structure
type ContentBlock = {
    type: 'paragraph' | 'heading' | 'list' | 'image';
    content: any;
    level?: number; // for headings
    items?: string[]; // for lists
    src?: string; // for images
    alt?: string;
};

interface ContentRendererProps {
    blocks: any;
}

// Fallback if the data is just a string/HTML
export default function ContentRenderer({ blocks }: ContentRendererProps) {
    if (!blocks) return null;

    // If it's a simple string (HTML or text)
    if (typeof blocks === 'string') {
        return <div dangerouslySetInnerHTML={{ __html: blocks }} />;
    }

    // If it's an array of blocks (custom JSON structure)
    if (Array.isArray(blocks)) {
        return (
            <div className="space-y-6">
                {blocks.map((block: ContentBlock, index: number) => {
                    switch (block.type) {
                        case 'heading':
                            const HeadingTag = `h${block.level || 2}` as React.ElementType;
                            return <HeadingTag key={index} className="text-2xl font-bold mt-8 mb-4">{block.content}</HeadingTag>;
                        case 'paragraph':
                            return <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{block.content}</p>;
                        case 'list':
                            return (
                                <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                                    {block.items?.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        );
    }

    return null;
}
