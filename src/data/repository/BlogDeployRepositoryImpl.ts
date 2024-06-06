import { BlogDeployRepositoryInterface } from "@/domain/repository/BlogDeployRepositoryInterface";
import { GithubRepoDataSource } from "@/data/dataSource/github/GithubRepoDataSource";

export class BlogDeployRepositoryImpl implements BlogDeployRepositoryInterface {
    dataSource: GithubRepoDataSource;

    constructor(dataSource: GithubRepoDataSource) {
        this.dataSource = dataSource;
    }

    async createRemoteRepository(
        userName: string,
        repositoryName: string
    ): Promise<any> {
        return this.dataSource.forkTemplateRepo(userName, repositoryName);
    }
}
