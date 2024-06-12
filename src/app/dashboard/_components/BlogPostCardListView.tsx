'use client';
import { BlogPostCard } from '@/app/dashboard/_components/BlogPostCard';
import { PostEntity } from '@/domain/entities/PostEntity';
import { useEffect, useState, useTransition } from 'react';
import { getAllIssues } from '@/actions/IssueAction';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
export function BlogPostCardListView({
    userName,
    blogRepoName,
}: {
    userName: string;
    blogRepoName: string;
}) {
    const [allIssues, setAllIssues] = useState<PostEntity[]>([]);
    const [isSyncWithRemote, startSyncWithRemote] = useTransition();

    useEffect(() => {
        if (blogRepoName === '') return;
        startSyncWithRemote(() => {
            getAllIssues(userName, blogRepoName).then((issues) => {
                setAllIssues(issues);
                console.log('issues', issues);
            });
        });
    }, []);

    const issueListUI = (
        <div className={'w-full flex flex-col space-y-2'}>
            {allIssues?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
    const skeletonUI = (
        <div className={'w-full flex flex-col space-y-2'}>
            <Skeleton className={'w-full h-24 rounded-xl'} />
            <Skeleton className={'w-full h-24 rounded-xl'} />
            <Skeleton className={'w-full h-24 rounded-xl'} />
        </div>
    );
    return isSyncWithRemote ? skeletonUI : issueListUI;
}
