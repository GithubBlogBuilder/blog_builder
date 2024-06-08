'use client';
import { useUserData } from '@/components/hooks/useUserData';
import { DashboardOverViewCard } from '@/app/dashboard/_components/DashboardOverViewCard';
import { BlogPostCardListView } from '@/app/dashboard/_components/BlogPostCardListView';
import { SectionHeader } from '@/app/dashboard/_components/SectionHeader';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/blocks/LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';
export default function Dashboard() {
    const { userData, isSyncWithRemote } = useUserData();

    return (
        <div
            className={
                'w-full h-svh py-4 flex flex-col justify-start items-start gap-4'
            }
        >
            {/*<p className={'text-2xl font-bold'}>*/}
            {/*    <span className={'text-primary'}>歡迎回來 &nbsp;</span>*/}
            {/*    {userData.githubUser.userName}*/}
            {/*</p>*/}
            <SectionHeader
                title={'Blog Dashboard 部落格狀態管理'}
                description={'檢視你的部落格部署狀態'}
            />
            <DashboardOverViewCard user={userData} />
            <SectionHeader
                title={'Post Management 貼文管理'}
                description={'檢視/新增/編輯你的貼文，點擊貼文進入編輯頁面'}
            />
            {isSyncWithRemote && userData.blogRepoName != undefined ? (
                <>
                    <Skeleton className={'w-full rounded-xl h-12'} />
                    <Skeleton className={'w-full rounded-xl h-12'} />
                    <Skeleton className={'w-full rounded-xl h-12'} />
                </>
            ) : (
                <BlogPostCardListView
                    userName={userData.githubUser.userName}
                    blogRepoName={userData.blogRepoName ?? ''}
                />
            )}
        </div>
    );
}
