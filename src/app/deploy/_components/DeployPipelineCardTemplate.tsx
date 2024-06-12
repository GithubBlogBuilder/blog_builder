import { LuCheck, LuAngry } from 'react-icons/lu';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MdOutlinePending } from 'react-icons/md';
import { StepCardState } from '@/app/deploy/_provider/DeployProvider';

function StateIcon(state: StepCardState) {
    const Icon = StateUIMap[state].icon;
    return (
        <div
            className={cn(
                'w-7 h-7 rounded-2xl flex flex-col justify-center items-center text-white',
                StateUIMap[state].cssColor
            )}
        >
            <Icon size={24} />
        </div>
    );
}

const StateUIMap = {
    processing: {
        cssColor: 'bg-primary',
        icon: MdOutlinePending,
    },
    completed: {
        cssColor: 'bg-green-600',
        icon: LuCheck,
    },
    pending: {
        cssColor: 'bg-gray-600',
        icon: MdOutlinePending,
    },
    error: {
        cssColor: 'bg-red-600',
        icon: LuAngry,
    },
};

function CardHeader({
    title,
    description,
    state,
}: {
    title: string;
    description: string;
    state: StepCardState;
}) {
    return (
        <div className={'w-full flex flex-row justify-between items-center'}>
            <div className={'flex flex-col justify-start items-start pr-4'}>
                <p className={'font-bold text-xl'}>{title}</p>
                <p className={'font-normal text-md'}>{description}</p>
            </div>
            <div
                className={cn(
                    'grow-0 transition-all duration-500',
                    state === StepCardState.processing ? 'scale-0' : 'scale-100'
                )}
            >
                {StateIcon(state)}
            </div>
        </div>
    );
}

export function DeployPipelineCardTemplate({
    title,
    layout = 'row',
    description = '',
    state,
    children,
}: {
    title: string;
    description?: string;
    layout: 'row' | 'column';
    isCompleted?: boolean;
    children: React.ReactNode;
    state: StepCardState;
}) {
    return (
        <div
            className={cn(
                state === StepCardState.processing
                    ? 'steps current-step'
                    : state === StepCardState.completed
                      ? 'steps complete'
                      : 'steps pending',
                'w-full border-2 rounded-lg border-foreground/10 p-8 transition-all duration-500',
                state === StepCardState.pending ? 'blur-[2px]' : 'blur-[0px]',
                layout === 'row' && state === StepCardState.processing
                    ? 'flex flex-row justify-start items-center '
                    : 'flex flex-col items-start justify-start'
            )}
        >
            <CardHeader title={title} description={description} state={state} />
            <div
                className={cn(
                    'w-full flex-grow transition-all duration-500 ease-out flex flex-col items-center justify-center',
                    state === StepCardState.processing
                        ? 'scale-y-100 opacity-100'
                        : 'scale-y-0 opacity-0 max-h-0 min-h-0 h-0'
                )}
            >
                <div className={cn('w-full', layout === 'row' ? '' : 'py-4')}>
                    {children}
                </div>
            </div>
        </div>
        // </div>
    );
}
