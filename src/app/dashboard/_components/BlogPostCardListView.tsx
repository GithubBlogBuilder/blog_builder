"use client";
import { BlogPostCard } from "@/app/dashboard/_components/BlogPostCard";
import { getIssues } from "@/domain/usecases/IssueUseCase";
import { PostEntity } from "@/domain/entities/PostEntity";
import { useEffect, useState } from "react";
import { getAllIssues } from "@/actions/IssueAction";
import { useUserData } from "@/components/hooks/useUserData";

export function BlogPostCardListView() {
    const [allIssues, setAllIssues] = useState<PostEntity[]>([]);
    const { userData, isSyncWithRemote } = useUserData();

    useEffect(() => {
        const fetchIssues = async () => {
            if (
                userData.userId === -1 ||
                isSyncWithRemote ||
                userData.blogRepoName === undefined
            ) {
                return;
            }
            const issues = await getAllIssues(
                userData.githubUser.userName, // for testing
                userData.blogRepoName
                // for testing
            );
            setAllIssues(issues);
        };
        fetchIssues().then();
    }, []);

    return (
        <div className={"w-full flex flex-col space-y-2"}>
            {allIssues?.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
