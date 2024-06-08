'use server';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { cookies } from 'next/headers';
import { getIssueDetail, getIssues } from '@/domain/usecases/IssueUseCase';

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
