import { IssueRepositoryInterface } from "@/domain/repository/IssueRepositoryInterface";
import { GithubIssueModel } from "../models/GithubIssueModel";
import { GithubIssueDataSource } from "@/data/dataSource/github/GithubIssueDataSource";

export class IssueRepositoryImpl implements IssueRepositoryInterface {
    dataSource: GithubIssueDataSource;

    constructor(dataSource: GithubIssueDataSource) {
        this.dataSource = dataSource;
    }

    getIssues(): Promise<GithubIssueModel[]> {
        return this.dataSource.listAllIssues();
    }

    getIssueDetail(issueNumber: number): Promise<GithubIssueModel | null> {
        return this.dataSource.getIssue(issueNumber);
    }

    createIssue(
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel | null> {
        return this.dataSource.createIssue(title, body, labels);
    }

    updateIssue(
        issueNumber: number,
        title: string,
        body: string
    ): Promise<GithubIssueModel | null> {
        return this.dataSource.updateIssue(issueNumber, title, body);
    }

    deleteIssue(nodeId: string): Promise<any> {
        return this.dataSource.deleteIssue(nodeId);
    }
}
