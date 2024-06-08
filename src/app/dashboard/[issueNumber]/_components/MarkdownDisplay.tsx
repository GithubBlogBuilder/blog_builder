'use client';
import React from 'react';
import Markdown from 'react-markdown';

export function MarkdownDisplay({ source }: { source: string }) {
    // useMotionValueEvent(scrollY, "change", (latest) => {
    //     console.log("Page scroll: ", latest)
    // })
    console.log('source\n', source);
    return (
        <article className="w-full flex flex-col prose prose-slate dark:prose-invert">
            {/*{source}*/}
            <Markdown>{source}</Markdown>
        </article>
    );
}
