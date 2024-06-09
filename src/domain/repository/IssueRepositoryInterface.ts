import { GithubIssueModel } from '@/data/models/GithubIssueModel';
import { GithubIssueDataSource } from '@/data/dataSource/github/GithubIssueDataSource';
export interface IssueRepositoryInterface {
    dataSource: GithubIssueDataSource;

    getIssues(): Promise<GithubIssueModel[]>;
    getIssueDetail(issueNumber: number): Promise<GithubIssueModel>;
    createIssue(
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel>;
    updateIssue(
        issueNumber: number,
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel>;
    deleteIssue(nodeId: string): Promise<void>;
}
