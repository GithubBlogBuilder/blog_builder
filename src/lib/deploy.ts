import { Octokit } from "octokit";

const headers = {
    "X-Github-Api-Version": "2022-11-28",
};

export class Deploy {
    static octokit = new Octokit({ auth: "" });

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
     * @param username The organization or person who will own the new repository. To create a new repository in an organization, the authenticated user must be a member of the specified organization.
     * @param repo The name of the new repository.
     */
    static async createRepoFromTemplate(
        username: string,
        repo: string
    ): Promise<void> {
        try {
            await this.octokit.request(
                "POST /repos/{template_owner}/{template_repo}/generate",
                {
                    template_owner: "GithubBlogBuilder",
                    template_repo: "blog_builder_default_template",
                    name: repo,
                    owner: username,
                    description:
                        'A blog website generate with "GithubBlogBuilder/blog_builder_default_template".',
                    headers: headers,
                }
            );
        } catch (e) {
            console.error(e);
        }
    }

    static async getWorkflowRunIds(
        username: string,
        repo: string
    ): Promise<number[]> {
        try {
            const response = await this.octokit.request(
                "GET /repos/{owner}/{repo}/actions/runs",
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
                "GET /repos/{owner}/{repo}/actions/runs/{run_id}",
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

    static async enablePages(username: string, repo: string): Promise<void> {
        try {
            await this.octokit.request("POST /repos/{owner}/{repo}/pages", {
                owner: username,
                repo: repo,
                build_type: "workflow",
                headers: headers,
            });
        } catch (e) {
            console.error(e);
        }
    }

    static async reRunWorkflow(
        username: string,
        repo: string,
        runId: number
    ): Promise<void> {
        try {
            await this.octokit.request(
                "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun",
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
}

type WorkflowStates = {
    status: "queued" | "in_progress" | "complete" | string | null;
    conclusion: "success" | "failure" | string | null;
};
