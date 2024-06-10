import {
    BlogDeployRepositoryInterface,
    WorkflowStatus,
} from '@/domain/repository/BlogDeployRepositoryInterface';
import { GithubRepoDataSource } from '@/data/dataSource/github/GithubRepoDataSource';
import { undefined } from 'zod';

export class BlogDeployRepositoryImpl implements BlogDeployRepositoryInterface {
    dataSource: GithubRepoDataSource;

    constructor(dataSource: GithubRepoDataSource) {
        this.dataSource = dataSource;
    }

    async createRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<void> {
        return this.dataSource.forkTemplateRepo(userName, repositoryName);
    }

    async deleteRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<void> {
        return this.dataSource.deleteRepo(userName, repositoryName);
    }

    async enableGithubPages(
        userName: string,
        repositoryName: string
    ): Promise<void> {
        return this.dataSource.enableGithubPages(userName, repositoryName);
    }

    async reRunWorkflow(
        userName: string,
        repositoryName: string,
        runId: number
    ): Promise<void> {
        return this.dataSource.reRunWorkflow(userName, repositoryName, runId);
    }

    async createWorkflowRunWebhook(
        userName: string,
        repositoryName: string
    ): Promise<void> {
        return Promise.resolve();
    }

    async getWorkflowRunId(
        userName: string,
        repositoryName: string
    ): Promise<void> {
        return Promise.resolve();
    }

    async getWorkflowRunStatus(
        userName: string,
        repositoryName: string,
        runId: number
    ): Promise<WorkflowStatus> {
        return Promise.resolve(undefined);
    }
}
