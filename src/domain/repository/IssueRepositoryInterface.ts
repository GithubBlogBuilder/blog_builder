import { GithubIssueModel } from "@/data/models/GithubIssueModel";
import { GithubIssueDataSource } from "@/data/dataSource/github/GithubIssueDataSource";
export interface IssueRepositoryInterface {
    dataSource: GithubIssueDataSource;

    getIssues(): Promise<GithubIssueModel[]>;
    getIssueDetail(issueNumber: number): Promise<GithubIssueModel | null>;
    createIssue(
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel | null>;
    updateIssue(
        issueNumber: number,
        title: string,
        body: string
    ): Promise<GithubIssueModel | null>;
    deleteIssue(nodeId: string): Promise<any>;
}
