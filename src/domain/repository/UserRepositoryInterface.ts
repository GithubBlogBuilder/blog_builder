import { GithubUserModel } from "@/data/models/GithubUserModel";
import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";

export interface UserRepositoryInterface {
    dataSource: GithubUserDataSource;

    getUser(): Promise<GithubUserModel>;
}
