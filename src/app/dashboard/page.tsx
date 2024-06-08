'use client';
import { useUserData } from '@/components/hooks/useUserData';
import { DashboardOverViewCard } from '@/app/dashboard/_components/DashboardOverViewCard';
import { BlogPostCardListView } from '@/app/dashboard/_components/BlogPostCardListView';
import { SectionHeader } from '@/app/dashboard/_components/SectionHeader';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import Link from 'next/link';
import { LuArchive, LuPlus } from 'react-icons/lu';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const { userData, isSyncWithRemote } = useUserData();

    return (
        <div
            className={
                'w-full h-svh py-4 flex flex-col justify-start items-start gap-4'
            }
        >
            {isSyncWithRemote ? null : (
                <p className={'text-2xl font-bold'}>
                    <span className={'text-primary'}>歡迎回來 &nbsp;</span>
                    {userData.githubUser.userName}
                </p>
            )}
            <div
                className={'w-full flex flex-row justify-between items-center'}
            >
                <SectionHeader
                    title={'Blog Dashboard 部落格狀態管理'}
                    description={'檢視你的部落格部署狀態'}
                />
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={
                                'flex flex-row justify-between text-destructive'
                            }
                        >
                            <LuArchive size={20} />
                            重新部署
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                確定要重新部署部落格嗎？
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                重新部署部落格將會將你的部落格重新部署到最新狀態，並刪除對應的
                                Issue Repo
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    console.log('redeploying blog...');
                                }}
                            >
                                確定
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <DashboardOverViewCard user={userData} />
            <div
                className={'w-full flex flex-row justify-between items-center'}
            >
                <SectionHeader
                    title={'Post Management 貼文管理'}
                    description={'檢視/新增/編輯你的貼文，點擊貼文進入編輯頁面'}
                />
                <Button variant={'outline'} asChild>
                    <Link
                        href={'/dashboard/create'}
                        className={'flex flex-row justify-between text-primary'}
                    >
                        <LuPlus size={20} />
                        新增貼文
                    </Link>
                </Button>
            </div>
            {isSyncWithRemote && userData.blogRepoName != undefined ? (
                <div>
                    <Skeleton className={'w-full rounded-xl h-12'} />
                    <Skeleton className={'w-full rounded-xl h-12'} />
                    <Skeleton className={'w-full rounded-xl h-12'} />
                </div>
            ) : (
                <BlogPostCardListView
                    userName={userData.githubUser.userName}
                    blogRepoName={userData.blogRepoName ?? ''}
                />
            )}
        </div>
    );
}
