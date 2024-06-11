'use client';
import { useUserData } from '@/components/hooks/useUserData';
import { DashboardOverViewCard } from '@/app/dashboard/_components/DashboardOverViewCard';
import { BlogPostCardListView } from '@/app/dashboard/_components/BlogPostCardListView';
import { SectionHeader } from '@/app/dashboard/_components/SectionHeader';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { ArchiveBlog } from '@/app/dashboard/_components/ActionButtons';
// import { useRouter } from 'next/navigation';
// import { checkUserDeployAction } from '@/actions/UserActions';
// import { isUserDeployed } from '@/domain/usecases/UserUseCase';

export default function Dashboard() {
    const { userData, isSyncWithRemote } = useUserData();
    // const router = useRouter();
    // useEffect(() => {
    //     if (isSyncWithRemote) {
    //         checkUserDeployAction(userData).then((deployed) => {
    //             console.log('dashboard page: checkUserDeployAction', deployed);
    //             if (deployed) {
    //                 // router.replace('/dashboard');
    //                 return;
    //             } else {
    //                 router.push('/deploy');
    //             }
    //         });
    //     }
    // }, [isSyncWithRemote]);

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
                className={
                    'w-full flex flex-row justify-between items-center space-x-2'
                }
            >
                <SectionHeader
                    title={'Blog Dashboard 部落格狀態管理'}
                    description={'檢視你的部落格部署狀態'}
                />
                <Button variant={'outline'}>重新運行 Action</Button>
                <ArchiveBlog />
            </div>
            <DashboardOverViewCard />
            <div
                className={'w-full flex flex-row justify-between items-center'}
            >
                <SectionHeader
                    title={'Post Management 貼文管理'}
                    description={'檢視/新增/編輯你的貼文，點擊貼文進入編輯頁面'}
                />
                <Button type={'button'} variant={'outline'} asChild>
                    <Link
                        href={'/dashboard/add-post'}
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
