'use client';
import { BlogPostCard } from '@/app/dashboard/_components/BlogPostCard';
import { PostEntity } from '@/domain/entities/PostEntity';
import { useEffect, useState } from 'react';
import { getAllIssues } from '@/actions/IssueAction';

export function BlogPostCardListView({
    userName,
    blogRepoName,
}: {
    userName: string;
    blogRepoName: string;
}) {
    const [allIssues, setAllIssues] = useState<PostEntity[]>([]);
    // const { userData, isSyncWithRemote } = useUserData();
    // console.log('userName', userName);
    // console.log('blogRepoName', blogRepoName);

    useEffect(() => {
        if (blogRepoName === '') return;
        getAllIssues(userName, blogRepoName).then((issues) => {
            setAllIssues(issues);
            console.log('issues', issues);
        });
    }, [blogRepoName]);

    return (
        <div className={'w-full flex flex-col space-y-2'}>
            {allIssues?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
