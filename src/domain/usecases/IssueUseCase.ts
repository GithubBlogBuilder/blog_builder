import { issueModelToEntity, PostEntity } from '@/domain/entities/PostEntity';
import { GithubIssueDataSource } from '@/data/dataSource/github/GithubIssueDataSource';
import { IssueRepositoryImpl } from '@/data/repository/IssueRepositoryImpl';
import { GithubIssueModel } from '@/data/models/GithubIssueModel';

export async function getIssues(
    accessToken: string,
    userName: string,
    repoName: string
): Promise<PostEntity[]> {
    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(accessToken, userName, repoName)
    );
    const issueList: GithubIssueModel[] = await issueRepo.getIssues();
    return issueList.map(issueModelToEntity);
}

export async function getIssueDetail(
    accessToken: string,
    userName: string,
    repoName: string,
    issueNumber: number
): Promise<PostEntity | null> {
    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(accessToken, userName, repoName)
    );
    return await issueRepo.getIssueDetail(issueNumber).then(
        (issue) => issueModelToEntity(issue),
        () => null
    );
}

export async function createIssue(
    accessToken: string,
    userName: string,
    repoName: string,
    title: string,
    body: string,
    labels: string[]
): Promise<PostEntity | null> {
    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(accessToken, userName, repoName)
    );
    return await issueRepo.createIssue(title, body, labels).then(
        (issue) => issueModelToEntity(issue),
        () => null
    );
}

export async function updateIssue(
    accessToken: string,
    userName: string,
    repoName: string,
    issueNumber: number,
    title: string,
    body: string,
    labels: string[]
): Promise<PostEntity | null> {
    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(accessToken, userName, repoName)
    );
    return await issueRepo.updateIssue(issueNumber, title, body, labels).then(
        (issue) => issueModelToEntity(issue),
        () => null
    );
}

export async function deleteIssue(
    accessToken: string,
    userName: string,
    repoName: string,
    nodeId: string
): Promise<void> {
    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(accessToken, userName, repoName)
    );
    return issueRepo.deleteIssue(nodeId);
}
