import {AuthTokenRepositoryInterface} from "@/domain/repository/authTokenRepository";
import { GithubTokenDataSource } from "../dataSource/GithubTokenDataSource";
import { LocalTokenDataSource } from "../dataSource/LocalTokenDataSource";

export class AuthTokenRepositoryImpl implements AuthTokenRepositoryInterface {
  getCookiesAuthToken(localDataSource: LocalTokenDataSource): string {
        return localDataSource.getGithubAuthToken()
  }
  async  setNewAuthToken(exChangeCode: string, localDataSource: LocalTokenDataSource, remoteDataSource: GithubTokenDataSource): Promise<any> {
      // throw new Error("Method not implemented.");
      localDataSource.clearGithubAuthToken()

      const res = await remoteDataSource.exchangeGithubToken(
            exChangeCode
      )

      localDataSource.setGithubAuthToken(res.accessToken)
      localDataSource.setGithubRefreshToken(res.refreshToken)

  }
  removeAuthToken(localDataSource: LocalTokenDataSource) {
        // throw new Error("Method not implemented.");
        localDataSource.clearGithubAuthToken()

  }
}