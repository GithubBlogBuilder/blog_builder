import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource"
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource"

export interface AuthTokenRepositoryInterface {
    // need to be implemented in the data layer
    getCookiesAuthToken(
        localDataSource: LocalTokenDataSource,
    ) : string,
    setNewAuthToken(
        exChangeCode: string,
        localDataSource: LocalTokenDataSource,
        remoteDataSource: GithubTokenDataSource,
    ): Promise<void>,
    removeAuthToken(
        localDataSource: LocalTokenDataSource,
    ): void,
}