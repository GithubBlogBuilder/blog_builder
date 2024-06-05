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
    getIssueDetail(issueNumber: number): Promise<GithubIssueModel> {
        throw Error("Method not implemented.");
    }
    createNewIssue(title: string, body: string): Promise<GithubIssueModel> {
        throw new Error("Method not implemented.");
    }
    updateIssue(
        issueNumber: number,
        title: string,
        body: string
    ): Promise<GithubIssueModel> {
        throw new Error("Method not implemented.");
    }
    deleteIssue(issueNumber: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
