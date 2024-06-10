'use server';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { cookies } from 'next/headers';
import {
    createIssue,
    deleteIssue,
    getIssueDetail,
    getIssues,
    updateIssue,
} from '@/domain/usecases/IssueUseCase';
import { PostEntity } from '@/domain/entities/PostEntity';

export async function getAllIssues(userName: string, repoName: string) {
    const nextCookies = cookies();
    // const local;
    const repo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(nextCookies),
        new GithubTokenDataSource()
    );
    const token = repo.getAccessToken();

    return await getIssues(token, userName, repoName);
}

export async function getIssuesWithIndex(
    index: number,
    userName: string,
    repoName: string
) {
    const nextCookies = cookies();
    // const local;
    const repo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(nextCookies),
        new GithubTokenDataSource()
    );
    const token = repo.getAccessToken();

    return await getIssueDetail(token, userName, repoName, index);
}

export async function updateIssueAction(
    index: number,
    userName: string,
    repoName: string,
    postData: PostEntity
) {
    const nextCookies = cookies();
    // const local;
    const repo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(nextCookies),
        new GithubTokenDataSource()
    );
    const token = repo.getAccessToken();

    return await updateIssue(
        token,
        userName,
        repoName,
        index,
        postData.title,
        postData.body
    );
}

export async function createIssueAction(
    userName: string,
    repoName: string,
    postData: PostEntity
) {
    const nextCookies = cookies();
    // const local;
    const repo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(nextCookies),
        new GithubTokenDataSource()
    );
    const token = repo.getAccessToken();

    return await createIssue(
        token,
        userName,
        repoName,
        postData.title,
        postData.body,
        postData.tags.map((tag) => tag.label)
    );
}

export async function deleteIssueAction(
    userName: string,
    repoName: string,
    postData: PostEntity
) {
    const nextCookies = cookies();
    // const local;
    const repo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(nextCookies),
        new GithubTokenDataSource()
    );
    const token = repo.getAccessToken();

    return await deleteIssue(token, userName, repoName, postData.nodeId);
}
