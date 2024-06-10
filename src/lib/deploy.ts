// import { Octokit } from "octokit";

const headers = {
    'X-Github-Api-Version': '2022-11-28',
};

export class Deploy {
    // static octokit = new Octokit({ auth: "" });

    /**
     * Create a new repository from the specified template.
     *
     * There is a workflow to build the next.js and deploy to the github pages,
     * however, the pages will **NOT** be enabled initially, so the first workflow
     * run will be failed. Call `enablePages` and then `reRunWorkflow` to complete
     * setting up it.
     *
     * If `enablePages` is called immediately after the first workflow runs, it
     * might be successful.
     *
     * @param username The organization or person who will own the new repository.
     * To create a new repository in an organization, the authenticated user must be
     * a member of the specified organization.
     * @param destinationRepo The name of the new repository.
     * @param templateOwner The name of the owner of the template. It can be a user
     * or organization.
     * @param templateRepo The name of the template repository.
     */
    // static async createRepoFromTemplate(
    //     username: string,
    //     destinationRepo: string,
    //     templateOwner: string,
    //     templateRepo: string,
    // ): Promise<void> {
    //     try {
    //         await this.octokit.request(
    //             "POST /repos/{template_owner}/{template_repo}/generate",
    //             {
    //                 template_owner: templateOwner,
    //                 template_repo: templateRepo,
    //                 name: destinationRepo,
    //                 owner: username,
    //                 description:
    //                     `A blog website generate with "${templateOwner}/${templateRepo}".`,
    //                 headers: headers,
    //             }
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    static async getWorkflowRunIds(
        username: string,
        repo: string
    ): Promise<number[]> {
        try {
            const response = await this.octokit.request(
                'GET /repos/{owner}/{repo}/actions/runs',
                {
                    owner: username,
                    repo: repo,
                    headers: headers,
                }
            );
            return response.data.workflow_runs.map((payload) => payload.id);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    static async getWorkflowRunStatus(
        username: string,
        repo: string,
        runId: number
    ): Promise<WorkflowStates | undefined> {
        try {
            const response = await this.octokit.request(
                'GET /repos/{owner}/{repo}/actions/runs/{run_id}',
                {
                    owner: username,
                    repo: repo,
                    run_id: runId,
                    headers: headers,
                }
            );
            return {
                status: response.data.status,
                conclusion: response.data.conclusion,
            };
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    // static async enablePages(username: string, repo: string): Promise<void> {
    //     try {
    //         await this.octokit.request('POST /repos/{owner}/{repo}/pages', {
    //             owner: username,
    //             repo: repo,
    //             build_type: 'workflow',
    //             headers: headers,
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    static async reRunWorkflow(
        username: string,
        repo: string,
        runId: number
    ): Promise<void> {
        try {
            await this.octokit.request(
                'POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun',
                {
                    owner: username,
                    repo: repo,
                    run_id: runId,
                    headers: headers,
                }
            );
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * It creates a new workflow run webhook for the specified repository.
     *
     * @param username The username of the owner.
     * @param repo The name of the repository.
     * @param backendUrl The URL of the webhook. e.g.
     * http://localhost:3000/api/webhook
     * @param insecureSsl Whether to use insecure http.
     * Pass ture if running on http without ssl support.
     * @returns The response object (in Promise).
     */
    static async createWorkflowRunWebhook(
        username: string,
        repo: string,
        backendUrl: string,
        insecureSsl: boolean
    ): Promise<Response> {
        return fetch(`https://api.github.com/repos/${username}/${repo}/hooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'web',
                active: true,
                events: ['workflow_run'],
                config: {
                    url: backendUrl,
                    content_type: 'json',
                    insecure_ssl: insecureSsl ? 1 : 0,
                },
            }),
        });
    }

    /**
     * It creates a repository variable with a key-value pair.
     * If the key has exists, the value will be updated.
     * 
     * Blog Template requires the following variables:
     * - `TOKEN`: GitHub access token.
     * 
     * @param username The username of the owner.
     * @param repo The name of the repository.
     * @param key The name of the variable.
     * @param value The value of the variable.
     * @returns The response object (in Promise).
     */
    static async setRepoVariable(
        username: string,
        repo: string,
        key: string,
        value: string
    ): Promise<Response> {
        return fetch(`https://api.github.com/repos/${username}/${repo}/actions/variables`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: key,
                value: value,
            }),
        })
    }
}

type WorkflowStates = {
    status: 'queued' | 'in_progress' | 'complete' | string | null;
    conclusion: 'success' | 'failure' | string | null;
};
