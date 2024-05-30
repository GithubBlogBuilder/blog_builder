import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";
import { GithubUserModel } from "@/data/models/GithubUserModel";
import { UserRepositoryInterface } from "@/domain/repository/userRepositoryInterface";

export class UserRepositoryImpl implements UserRepositoryInterface {
    userDataSource: GithubUserDataSource;
    constructor(dataSource: GithubUserDataSource) {
        this.userDataSource = dataSource;
    }

    getUser(): Promise<GithubUserModel> {
        return this.userDataSource.getUser();
    }
}
