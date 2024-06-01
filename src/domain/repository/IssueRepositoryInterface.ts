import { GithubIssueModel } from "@/data/models/GithubIssueModel";
import { GithubIssueDataSource } from "@/data/dataSource/github/GithubIssueDataSource";
export interface IssueRepositoryInterface {
    dataSource: GithubIssueDataSource;

    getIssues(): Promise<GithubIssueModel[]>;
    getIssueDetail(issueNumber: number): Promise<GithubIssueModel>;
    createNewIssue(title: string, body: string): Promise<GithubIssueModel>;
    updateIssue(
        issueNumber: number,
        title: string,
        body: string
    ): Promise<GithubIssueModel>;
    deleteIssue(issueNumber: number): Promise<any>;
}
