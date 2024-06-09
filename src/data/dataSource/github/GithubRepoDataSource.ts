import { GithubAPIError } from '@/lib/errors';

export class GithubRepoDataSource {
    private readonly _accessToken: string = '';

    constructor(token: string) {
        this._accessToken = token;
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
        const jsonResponse = await response.json();

        if (!response.ok) {
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
                name: repoName,
                owner: owner,
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
}
