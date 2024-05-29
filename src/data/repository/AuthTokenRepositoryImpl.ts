import {AuthTokenRepositoryInterface} from "@/domain/repository/authTokenRepository";
import { GithubTokenDataSource } from "../dataSource/github/GithubTokenDataSource";
import { LocalTokenDataSource } from "../dataSource/local/LocalTokenDataSource";

export class AuthTokenRepositoryImpl implements AuthTokenRepositoryInterface {
    localDataSource: LocalTokenDataSource
    remoteDataSource: GithubTokenDataSource
    constructor(localDataSource: LocalTokenDataSource, remoteDataSource: GithubTokenDataSource) {
        this.localDataSource = localDataSource
        this.remoteDataSource = remoteDataSource
    }
    getCookiesAuthToken(): string {
        return this.localDataSource.getGithubAuthToken()
    }
    async setNewAuthToken(exChangeCode: string): Promise<any> {
      // throw new Error("Method not implemented.");
      this.localDataSource.clearGithubAuthToken()

      const res = await this.remoteDataSource.exchangeGithubToken(
            exChangeCode
      )

      this.localDataSource.setGithubAuthToken(res.accessToken)
      this.localDataSource.setGithubRefreshToken(res.refreshToken)

    }
    removeAuthToken() {
        // throw new Error("Method not implemented.");
        this.localDataSource.clearGithubAuthToken()

    }
}