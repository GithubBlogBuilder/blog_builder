'use client';
import React from 'react';
import Markdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';

function MarkdownDisplay({ source }: { source: string }) {
    return (
        <article className="w-full flex flex-col prose prose-slate dark:prose-invert">
            {/*{source}*/}
            <Markdown>{source}</Markdown>
        </article>
    );
}

export function MarkdownEditFormField({
    name,
    controller,
    isLoading = false,
}: {
    name: string;
    controller: any;
    isLoading?: boolean;
}) {
    return (
        <FormField
            control={controller}
            name={name}
            render={({ field }) =>
                isLoading ? (
                    <Skeleton className={'w-full h-[300px] rounded-xl'} />
                ) : (
                    <Tabs
                        defaultValue="Write"
                        className="grow flex flex-col items-start justify-start"
                    >
                        <TabsList>
                            <TabsTrigger value="Write">撰寫</TabsTrigger>
                            <TabsTrigger value="Preview">預覽</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="Write"
                            className={'grow w-full flex flex-col'}
                        >
                            <Textarea {...field} rows={15} />
                        </TabsContent>
                        <TabsContent
                            value="Preview"
                            className={
                                'w-full flex flex-col justify-center items-center'
                            }
                        >
                            <MarkdownDisplay source={field.value} />
                        </TabsContent>
                    </Tabs>
                )
            }
        />
    );
}
