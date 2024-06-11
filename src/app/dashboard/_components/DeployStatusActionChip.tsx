import React, { useEffect, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const enum DeployStatus {
    standBy = 'standBy',
    success = 'success',
    inProgress = 'inProgress',
    error = 'error',
}

const statePropsMap = {
    inProgress: {
        text: 'text-blue-500',
        prefix: 'bg-blue-500',
        background: 'bg-blue-50',
        label: '進行中',
    },
    success: {
        text: 'text-green-500',
        prefix: 'bg-green-500',
        background: 'bg-green-50 dark:bg-green-500/10',
        label: '成功',
    },
    error: {
        text: 'text-red-500',
        prefix: 'bg-red-500',
        background: 'bg-red-50',
        label: '異常',
    },
    standBy: {
        text: 'text-gray-500',
        prefix: 'bg-gray-500',
        background: 'bg-gray-50',
        label: '待機',
    },
};

type StatusChipProps = {
    state: DeployStatus;
    // options?: {
    //     onClick?: () => void;
    // };
};
export function StatusChip({ state }: StatusChipProps, props: any) {
    const stateProps = statePropsMap[state];
    return (
        <div
            {...props}
            className={cn(
                'flex flex-row justify-start items-center px-4 py-1 rounded-md',
                props.background
            )}
        >
            <div className={cn(`${stateProps.prefix} w-2 h-2 rounded-full`)}>
                {' '}
            </div>
            <p
                className={cn(
                    'pl-2 text-md font-bold text-sm',
                    stateProps.text
                )}
            >
                {stateProps.label}
            </p>
        </div>
    );
}

export function DeployStatusActionChip({
    githubPageURL,
}: {
    githubPageURL: string;
}) {
    const [deployStatus, setDeployStatus] = useState<DeployStatus>(
        DeployStatus.standBy
    );

    const [isSyncWithBlog, startSyncWithBlog] = useTransition();
    const blogURL = `${githubPageURL}/hello-world`;

    useEffect(() => {
        if (!isSyncWithBlog && githubPageURL !== '') {
            startSyncWithBlog(async () => {
                console.log(
                    'DeployStatusActionChip: startSyncWithBlog',
                    blogURL
                );
                try {
                    const res = await fetch(blogURL, {
                        method: 'GET',
                        mode: 'no-cors',
                    });
                    if (res.status === 200) {
                        setDeployStatus(DeployStatus.success);
                    } else {
                        setDeployStatus(DeployStatus.error);
                    }
                } catch (error) {
                    console.error('DeployStatusActionChip: fetch error', error);
                    setDeployStatus(DeployStatus.error);
                }
            });
        }
    }, []);

    return isSyncWithBlog ? (
        <Skeleton className={'w-12 h-6 rounded-xl'} />
    ) : (
        <div className={'flex flex-row space-x-2 justify-start items-center'}>
            <StatusChip state={deployStatus} />
        </div>
    );
}
