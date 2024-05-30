import { GithubUserModel } from "@/data/models/GithubUserModel";
import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";

export interface UserRepositoryInterface {
    // need to be implemented in the data layer
    userDataSource: GithubUserDataSource;
    getUser(): Promise<GithubUserModel>;
}
