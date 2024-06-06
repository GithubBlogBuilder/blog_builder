import { Octokit } from "octokit";

export class GithubRepoDataSource {
    private readonly _accessToken: string = "";

    constructor(token: string) {
        this._accessToken = token;
    }

    async forkTemplateRepo(owner: string, repoName: string): Promise<any> {
        const octokit = new Octokit({
            auth: this._accessToken,
        });
        try {
            // await fetch('https://api.github.com/repos/TEMPLATE_OWNER/TEMPLATE_REPO/generate');
            // await octokit.request(
            //     "POST /repos/{template_owner}/{template_repo}/generate",
            //     {
            //         template_owner: "GithubBlogBuilder",
            //         template_repo: "blog_builder_default_template",
            //         name: repoName,
            //         owner: owner,
            //         description:
            //             'A blog website generate with "GithubBlogBuilder/blog_builder_default_template".',
            //         headers: {
            //             "X-Github-Api-Version": "2022-11-28",
            //         },
            //     }
            // );
            const template_owner = "GithubBlogBuilder";
            const template_repo = "blog_builder_default_template";
            const response = await fetch(
                `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/vnd.github.raw+json",
                        "Content-Type": "application/json",
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

            console.log("GithubRepoDataSource: forked repo", data);

            // const data = await response.json();
            // console.log("GithubRepoDataSource: forked repo", response.json());
            // return data;
        } catch (error) {
            throw error;
        }
    }
}
