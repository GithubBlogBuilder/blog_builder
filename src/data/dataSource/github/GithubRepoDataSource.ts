export class GithubRepoDataSource {
    private readonly _accessToken: string = '';

    constructor(token: string) {
        this._accessToken = token;
    }

    async forkTemplateRepo(owner: string, repoName: string): Promise<void> {
        try {
            const template_owner = 'GithubBlogBuilder';
            const template_repo = 'blog_builder_default_template';
            const response = await fetch(
                `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/vnd.github.raw+json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this._accessToken}`,
                    },
                    body: JSON.stringify({
                        name: repoName,
                        owner: owner,
                        description:
                            'A blog website generate with "GithubBlogBuilder/blog_builder_default_template".',
                    }),
                }
            );

            const data = await response.json();

            // console.log('GithubRepoDataSource: forked repo', data);

            if (response.status === 422) {
                return Promise.reject({
                    type: 'repo_already_exists',
                    message: 'Repo already exists',
                });
            }

            return Promise.resolve();
        } catch (error) {
            // throw error;
            // console.error('GithubRepoDataSource: forked repo failed', error);
            return Promise.reject(error);
        }
    }
}
