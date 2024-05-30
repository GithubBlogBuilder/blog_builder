import { GithubIssueModel } from "@/data/models/GithubIssueModel";
import { GithubUserModel } from "@/data/models/GithubUserModel";

export class GithubIssueDataSource {
    _accessToken: string;
    _owner: string;
    _repo: string;
    constructor(token: string, userName: string, repoName: string) {
        this._accessToken = token;
        this._owner = userName;
        this._repo = repoName;
    }

    async listAllIssues(): Promise<GithubIssueModel[]> {
        const response = await fetch(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
            {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github.raw+json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`,
                },
            }
        );
        const jsonData = await response.json();

        const issueList: GithubIssueModel[] = jsonData.map((issue: any) => {
            return {
                id: issue.id,
                nodeId: issue.node_id,
                title: issue.title,
                body: issue.body,
                labels: issue.labels,
                number: issue.number,
                state: issue.state,
                createdAt: issue.created_at,
                updatedAt: issue.updated_at,
                comments: issue.comments,
                reactions: issue.reactions.total_count,
                user: {
                    login: issue.user.login,
                    id: issue.user.id,
                    avatarUrl: issue.user.avatar_url,
                } as GithubUserModel,
            };
        });

        return issueList;
    }

    async getIssue(issueNumber: number) {
        const response = await fetch(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues/${issueNumber}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github.raw+json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`,
                },
            }
        );
        return response;
    }
    async createIssue(issueModel: GithubIssueModel) {
        const postBody = {
            title: issueModel.title,
            body: issueModel.body,
            labels: issueModel.labels.map((label) => label.name),
        };
        const response = await fetch(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
            {
                method: "POST",
                headers: {
                    Accept: "application/vnd.github.raw+json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`,
                },
                body: JSON.stringify(postBody),
            }
        );
        return response;
    }

    async updateIssue(issueModel: GithubIssueModel) {
        const postBody = {
            query: `
            mutation {
                updateIssue(input: {id: "${issueModel.nodeId}", body: "${issueModel.body}", title: "${issueModel.title}"}) {
                    issue {
                        body
                        title
                    }
                }
            }
        `,
        };
        const response = await fetch(`https://api.github.com/graphql`, {
            method: "POST",
            headers: {
                Accept: "application/vnd.github.v4+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._accessToken}`,
            },
            body: JSON.stringify(postBody),
        });
        return response;
    }

    async deleteIssue(issueModel: GithubIssueModel) {
        const postBody = {
            query: `
            mutation {
                deleteIssue(input: {issueId: "${issueModel.nodeId}", clientMutationId: "${issueModel.nodeId}"}) {
                    clientMutationId
                }
            }
        `,
        };
        const response = await fetch(`https://api.github.com/graphql`, {
            method: "POST",
            headers: {
                Accept: "application/vnd.github.v4+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._accessToken}`,
            },
            body: JSON.stringify(postBody),
        });
        return response;
    }
}
