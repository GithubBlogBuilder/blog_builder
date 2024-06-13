import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";
import { GithubUserModel } from "@/data/models/GithubUserModel";
import { UserRepositoryInterface } from "@/domain/repository/UserRepositoryInterface";

export class UserRepositoryImpl implements UserRepositoryInterface {
    dataSource: GithubUserDataSource;

    constructor(dataSource: GithubUserDataSource) {
        this.dataSource = dataSource;
    }

    async getUser(): Promise<GithubUserModel> {
        return this.dataSource.getUser();
    }

    async getUserByName(username: string): Promise<GithubUserModel> {
        return this.dataSource.getUserByName(username);
    }
}
