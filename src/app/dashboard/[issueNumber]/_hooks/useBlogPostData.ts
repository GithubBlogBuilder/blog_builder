import { useEffect, useState, useTransition } from 'react';
import { PostEntity } from '@/domain/entities/PostEntity';
import { getIssuesWithIndex } from '@/actions/IssueAction';

export function useBlogPostData(
    postIndex: number,
    userName: string,
    blogRepoName: string
) {
    const [postData, setPostData] = useState<PostEntity>();
    const [isSyncWithRemote, startSyncWithRemote] = useTransition();

    async function _syncWithRemote() {
        console.log('syncing with remote...');
        console.log('user', userName);
        console.log('repo', blogRepoName);

        startSyncWithRemote(async () => {
            const blogData = await getIssuesWithIndex(
                postIndex,
                userName,
                blogRepoName
            );

            if (blogData !== null) {
                setPostData(blogData);
            }
            console.log('get user data');
        });
    }

    useEffect(() => {
        _syncWithRemote();
    }, []);

    return {
        postData,
        isSyncWithRemote,
    };
}
