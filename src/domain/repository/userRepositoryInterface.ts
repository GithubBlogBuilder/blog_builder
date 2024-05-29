import {GithubUserModel} from "@/data/models/githubUserModel";
import {GithubUserDataSource} from "@/data/dataSource/github/GithubUserDataSource";

export interface UserRepositoryInterface {
    // need to be implemented in the data layer
    userDataSource: GithubUserDataSource,
    getUser(): Promise<GithubUserModel>,
}