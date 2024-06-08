'use client';
import Image from 'next/image';
import React, { Suspense, useEffect, useTransition } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { LuLink, LuGitBranch, LuTimer } from 'react-icons/lu';
import { useState } from 'react';
import { getBlogHomePageScreenShotAction } from '@/actions/BlogAction';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusChip } from '@/components/blocks/blog/StatusChip';
import { UserEntity } from '@/domain/entities/UserEntity';

function InfoField({
    label,
    children,
    isLoading = false,
}: {
    label: string;
    children: React.ReactNode;
    isLoading?: boolean;
}) {
    return isLoading ? (
        <div className={'w-full flex flex-col items-start space-y-1'}>
            <Skeleton className="animate-pulse w-36 h-5 rounded-md" />
            <Skeleton className="animate-pulse w-48 h-5 rounded-md" />
        </div>
    ) : (
        <div className={'flex flex-col items-start space-y-1'}>
            <Label className={'text-primary'}>{label}</Label>
            {children}
        </div>
    );
}

type BlogDeployInfo = {
    blogTitle: string;
    status: '運行中' | '異常' | '部署中';
    blogDeployLink?: string;
    githubRepoLink?: string;
    lastTimeUpdated: string;
};

function WebsiteScreenShot({ url }: { url: string }) {
    const [screenShot, setScreenShot] = useState<string>('');
    const [imageSuspend, startImageLoading] = useTransition();
    useEffect(() => {
        if (url === '') return;
        startImageLoading(() => {
            getBlogHomePageScreenShotAction(url).then((image) =>
                setScreenShot(`data:image/png;base64,${image}`)
            );
        });
    }, []);

    return (
        <div
            id={'screen-shot'}
            className={
                'relative overflow-clip h-[320px] md:w-[400px] md:h-full border-2 rounded-xl shadow-sm items-center justify-center'
            }
        >
            {!imageSuspend && url !== '' ? (
                <Image
                    src={screenShot}
                    alt={'部署頁面截圖'}
                    layout={'fill'}
                    className={'absolute rounded-xl object-cover object-top'}
                    priority={true}
                />
            ) : (
                <Skeleton className="animate-pulse w-full h-[320px] p-4 rounded-xl" />
            )}
        </div>
    );
}

function TextDataDisplay({
    value,
    href = '',
    decoration = null,
}: {
    value: string;
    href?: string;
    decoration?: React.ReactNode;
}) {
    const body = (
        <div
            className={
                'flex flex-row justify-start items-center space-x-2 text-sm'
            }
        >
            {decoration}
            <p className={'font-semibold'}>{value}</p>
        </div>
    );

    if (href.length > 0) {
        return (
            <Link href={href} target={'_blank'} className={'underline'}>
                {body}
            </Link>
        );
    }

    return body;
}

export function DashboardOverViewCard({ user }: { user: UserEntity }) {
    const isLoading = user.userId === -1;

    const blogDeployInfo: BlogDeployInfo = {
        blogTitle: user.blogRepoName ?? '',
        status: '異常',
        lastTimeUpdated: '2021-10-10 10:10:10',
        blogDeployLink: `https://${user.githubUser.userName}.github.io/${user.blogRepoName}`,
        githubRepoLink: `https://github.com/${user.githubUser.userName}/${user.blogRepoName}`,
    };

    const fieldMapper = [
        {
            label: '部落格名稱',
            value: <TextDataDisplay value={blogDeployInfo.blogTitle} />,
        },
        {
            label: '部署狀態',
            value: (
                <StatusChip state={'failed'} label={blogDeployInfo.status} />
            ),
        },
        {
            label: '最後更新時間',
            value: <TextDataDisplay value={blogDeployInfo.lastTimeUpdated} />,
        },
        {
            label: '部署連結',
            value: (
                <TextDataDisplay
                    value={blogDeployInfo.blogDeployLink ?? ''}
                    href={blogDeployInfo.blogDeployLink}
                    decoration={<LuLink />}
                />
            ),
        },
        {
            label: 'Github 連結',
            value: (
                <TextDataDisplay
                    value={`${user.githubUser.userName}/${user.blogRepoName}`}
                    href={blogDeployInfo.githubRepoLink}
                    decoration={<LuGitBranch />}
                />
            ),
        },
    ];

    return (
        <Card className={'w-full flex flex-col'}>
            <div
                className={
                    'flex flex-col p-4 h-84 space-y-4 md:flex-row md:space-x-4 md:space-y-0'
                }
            >
                {isLoading ? (
                    <Skeleton className="w-full h-full p-4 rounded-xl" />
                ) : (
                    <WebsiteScreenShot
                        url={blogDeployInfo.blogDeployLink as string}
                    />
                )}
                <div
                    className={
                        'flex-grow flex flex-col justify-center items-start space-y-4'
                    }
                >
                    {fieldMapper.map((field) => (
                        <InfoField
                            key={field.label}
                            label={field.label}
                            isLoading={isLoading}
                        >
                            {field.value}
                        </InfoField>
                    ))}
                </div>
            </div>
        </Card>
    );
}
