import {UserRepositoryInterface} from "@/domain/repository/userRepositoryInterface";
import {GithubUserDataSource} from "@/data/dataSource/GithubUserDataSource";
import {GithubUserModel} from "@/data/models/githubUserModel";

export class UserRepositoryImpl implements UserRepositoryInterface {
    userDataSource: GithubUserDataSource
    constructor(dataSource: GithubUserDataSource){
        this.userDataSource = dataSource
    }

    getUser(): Promise<GithubUserModel> {
        return this.userDataSource.getUser()
    }
}