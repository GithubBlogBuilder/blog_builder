import {
    GithubIssueModel,
    jsonToGithubIssueModel,
} from "@/data/models/GithubIssueModel";

export class GithubIssueDataSource {
    _accessToken: string;
    _owner: string;
    _repo: string;

    constructor(token: string, userName: string, repoName: string) {
        this._accessToken = token;
        this._owner = userName;
        this._repo = repoName;
    }

    async sendRequest(url: string, method: string, body: any = null) {
        let init: any = {
            method: method,
            headers: {
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._accessToken}`,
            },
            cache: "no-cache",
        };
        if (body) init.body = JSON.stringify(body);

        const response = await fetch(url, init);
        const jsonData = await response.json();

        if (!response.ok) {
            // error handling
            console.log(
                `github endpoint returned status code ${response.status} with message ${jsonData.message}`
            );
            console.trace("sendRequest");
            return null;
        }
        return jsonData;
    }

    async listAllIssues(): Promise<GithubIssueModel[]> {
        const jsonData = await this.sendRequest(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
            "GET"
        );
        if (!jsonData) return [];
        return jsonData.map(jsonToGithubIssueModel);
    }

    async getIssue(issueNumber: number): Promise<GithubIssueModel | null> {
        const jsonData = await this.sendRequest(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues/${issueNumber}`,
            "GET"
        );
        if (!jsonData) return null;
        return jsonToGithubIssueModel(jsonData);
    }

    async createIssue(
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel | null> {
        const postBody = {
            title: title,
            body: body,
            labels: labels,
        };
        const jsonData = await this.sendRequest(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
            "POST",
            postBody
        );
        if (!jsonData) return null;
        return jsonToGithubIssueModel(jsonData);
    }

    async updateIssue(
        issueNumber: number,
        title: string,
        body: string
    ): Promise<GithubIssueModel | null> {
        const patchBody = {
            title: title,
            body: body,
        };
        const jsonData = await this.sendRequest(
            `https://api.github.com/repos/${this._owner}/${this._repo}/issues/${issueNumber}`,
            "PATCH",
            patchBody
        );
        if (!jsonData) return null;
        return jsonToGithubIssueModel(jsonData);
    }

    async deleteIssue(nodeId: string): Promise<any> {
        const postBody = {
            query: `
            mutation {
                deleteIssue(input: {issueId: "${nodeId}", clientMutationId: "${nodeId}"}) {
                    clientMutationId
                }
            }
        `,
        };
        const jsonData = await this.sendRequest(
            `https://api.github.com/graphql`,
            "POST",
            postBody
        );
        if (!jsonData) return Promise.reject("Failed to delete issue");
        if (jsonData.errors) return Promise.reject(jsonData.errors[0].message);
        return Promise.resolve();
    }
}
