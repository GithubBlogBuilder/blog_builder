import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function FieldSkeleton() {
    return (
        <div className={'flex flex-col space-y-2'}>
            <Skeleton className={'h-6 w-[180px] rounded-xl'} />
            <Skeleton className={'h-6 w-full rounded-xl'} />
            <Skeleton className={'h-6 w-[100px] rounded-xl'} />
        </div>
    );
}
export function TextInputField({
    controller,
    label,
    name,
    isLoading = false,
    placeholder,
    description,
    isTextArea = false,
}: {
    controller: any;
    label: string;
    name: string;
    isLoading?: boolean;
    placeholder: string;
    description: string;
    isTextArea?: boolean;
}) {
    return (
        <FormField
            control={controller}
            name={name}
            render={({ field }) => (
                <FormItem className={'w-full'}>
                    {isLoading ? (
                        <FieldSkeleton />
                    ) : (
                        <div>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                {!isTextArea ? (
                                    <Input
                                        placeholder={placeholder}
                                        {...field}
                                    />
                                ) : (
                                    <Textarea
                                        placeholder={placeholder}
                                        {...field}
                                    />
                                )}
                            </FormControl>
                            <FormDescription>{description}</FormDescription>
                            <FormMessage />
                        </div>
                    )}
                </FormItem>
            )}
        />
    );
}
