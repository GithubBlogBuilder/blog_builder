import { GithubRepoDataSource } from '@/data/dataSource/github/GithubRepoDataSource';

export enum WorkflowStatus {
    Queued = 'queued',
    Requested = 'requested',
    InProgress = 'in_progress',
    Completed = 'completed',
    Pending = 'pending',
    Waiting = 'waiting',
}

export enum WorkflowConclusion {
    ActionRequired = 'action_required',
    Success = 'success',
    Failure = 'failure',
    Cancelled = 'cancelled',
    Neutral = 'neutral',
    Skipped = 'skipped',
    Stale = 'Stale',
    TimeOut = 'timed_out',
}

export interface BlogDeployRepositoryInterface {
    dataSource: GithubRepoDataSource;

    createRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<void>;

    deleteRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<void>;

    enableGithubPages(userName: string, repositoryName: string): Promise<void>;

    reRunWorkflow(
        userName: string,
        repositoryName: string,
        runId: number
    ): Promise<void>;

    getWorkflowRunId(userName: string, repositoryName: string): Promise<void>;

    getWorkflowRunStatus(
        userName: string,
        repositoryName: string,
        runId: number
    ): Promise<WorkflowStatus>;

    createWorkflowRunWebhook(
        userName: string,
        repositoryName: string
    ): Promise<void>;
}
