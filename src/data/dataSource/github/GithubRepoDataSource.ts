import { GithubAPIError } from '@/lib/errors';
import { WorkflowStatus } from '@/domain/repository/BlogDeployRepositoryInterface';

export class GithubRepoDataSource {
    private readonly _accessToken: string = '';

    constructor(token: string) {
        this._accessToken = token;
    }

    async sendRequest(url: string, method: string, body: any = null) {
        const init: any = {
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
        // console.log('response', response);

        if (!response.ok) {
            const jsonResponse = await response.json();
            console.log(
                `github endpoint returned status code ${response.status} with message ${jsonResponse.message}`
            );
            throw new GithubAPIError(response.status, jsonResponse.message);
        }
        return response;
    }

    async forkTemplateRepo(owner: string, repoName: string): Promise<void> {
        try {
            const template_owner = 'GithubBlogBuilder';
            const template_repo = 'blog_builder_default_template';
            const postBody = {
                owner: owner,
                name: repoName,
                description:
                    'A blog website generated with "GithubBlogBuilder/blog_builder_default_template".',
            };
            await this.sendRequest(
                `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
                'POST',
                postBody
            );

            return Promise.resolve();
        } catch (e) {
            if (e instanceof GithubAPIError && e.statusCode === 422) {
                console.log('forkTemplateRepo: Repo already exists');
            }
            return Promise.reject(e);
        }
    }

    async deleteRepo(owner: string, repoName: string): Promise<void> {
        console.log(`GithubRepoDataSource: deleting repo ${owner}/${repoName}`);
        try {
            await this.sendRequest(
                `https://api.github.com/repos/${owner}/${repoName}`,
                'DELETE'
            );
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async enableGithubPages(owner: string, repoName: string): Promise<void> {
        try {
            await this.sendRequest(
                `https://api.github.com/repos/${owner}/${repoName}/pages`,
                'POST',
                {
                    build_type: 'workflow',
                }
            );
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async setRepoVariable(
        username: string,
        repo: string,
        key: string,
        value: string
    ): Promise<Response | null> {
        const postResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo}/actions/variables`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: key,
                    value: value,
                }),
            }
        );
        if (postResponse.status === 201) return postResponse;
        else if (postResponse.status === 409) {
            const patchResponse = await fetch(
                `https://api.github.com/repos/${username}/${repo}/actions/variables/${key}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: key,
                        value: value,
                    }),
                }
            );
            if (patchResponse.status === 204) return patchResponse;
        }
        return null;
    }

    async reRunWorkflow(
        owner: string,
        repoName: string,
        runId: number
    ): Promise<void> {
        try {
            await this.sendRequest(
                `https://api.github.com/repos/${owner}/${repoName}/actions/runs/${runId}/rerun`,
                'POST'
            );
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getWorkflowRunId(owner: string, repoName: string): Promise<number[]> {
        try {
            const response = await this.sendRequest(
                `https://api.github.com/repos/${owner}/${repoName}/actions/runs`,
                'GET'
            );
            const json = await response.json();
            const workflowRuns: Array<{ id: number }> = json['workflow_runs'];
            return workflowRuns.map((payload) => payload.id);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // async getWorkflowRunStatus(
    //     owner: string,
    //     repoName: string,
    //     runId: number
    // ): Promise<WorkflowStatus> {
    //     try {
    //         const response = await this.sendRequest(
    //             `https://api.github.com/repos/${owner}/${repoName}/actions/runs/${runId}`,
    //             'GET'
    //         );
    //         const json = await response.json();
    //         return {
    //             status: json.status,
    //             conclusion: json.conclusion,
    //         };
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }
    //
    // async createWorkflowRunWebhook(
    //     owner: string,
    //     repoName: string
    // ): Promise<void> {
    //     try {
    //         await this.sendRequest(
    //             `https://api.github.com/repos/${owner}/${repoName}/actions/runs`,
    //             'POST'
    //         );
    //         return Promise.resolve();
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }
}
