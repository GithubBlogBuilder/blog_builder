import {
    GithubIssueModel,
    jsonToGithubIssueModel,
} from '@/data/models/GithubIssueModel';
import { GithubAPIError } from '@/lib/errors';

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
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._accessToken}`,
            },
            cache: 'no-cache',
        };
        if (body) init.body = JSON.stringify(body);

        const response = await fetch(url, init);
        const jsonData = await response.json();

        if (!response.ok) {
            console.log(
                `github endpoint returned status code ${response.status} with message ${jsonData.message}`
            );
            throw new GithubAPIError(response.status, jsonData.message);
        }
        return jsonData;
    }

    async listAllIssues(): Promise<GithubIssueModel[]> {
        try {
            const jsonData = await this.sendRequest(
                `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
                'GET'
            );
            return jsonData.map(jsonToGithubIssueModel);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getIssue(issueNumber: number): Promise<GithubIssueModel> {
        try {
            const jsonData = await this.sendRequest(
                `https://api.github.com/repos/${this._owner}/${this._repo}/issues/${issueNumber}`,
                'GET'
            );
            return jsonToGithubIssueModel(jsonData);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async createIssue(
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel> {
        try {
            const postBody = {
                title: title,
                body: body,
                labels: labels,
            };
            const jsonData = await this.sendRequest(
                `https://api.github.com/repos/${this._owner}/${this._repo}/issues`,
                'POST',
                postBody
            );
            return jsonToGithubIssueModel(jsonData);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async updateIssue(
        issueNumber: number,
        title: string,
        body: string,
        labels: string[]
    ): Promise<GithubIssueModel> {
        try {
            const patchBody = {
                title: title,
                body: body,
                labels: labels,
            };
            const jsonData = await this.sendRequest(
                `https://api.github.com/repos/${this._owner}/${this._repo}/issues/${issueNumber}`,
                'PATCH',
                patchBody
            );
            return jsonToGithubIssueModel(jsonData);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async deleteIssue(nodeId: string): Promise<void> {
        try {
            const postBody = {
                query: `mutation {
                    deleteIssue(input: {issueId: "${nodeId}", clientMutationId: "${nodeId}"}) {
                        clientMutationId
                    }
                }`,
            };
            const jsonData = await this.sendRequest(
                `https://api.github.com/graphql`,
                'POST',
                postBody
            );
            if (jsonData.errors)
                return Promise.reject(jsonData.errors[0].message);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
