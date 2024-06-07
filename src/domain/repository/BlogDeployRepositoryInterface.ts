import { GithubRepoDataSource } from "@/data/dataSource/github/GithubRepoDataSource";

export interface BlogDeployRepositoryInterface {
    dataSource: GithubRepoDataSource;

    createRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<any>;
}
