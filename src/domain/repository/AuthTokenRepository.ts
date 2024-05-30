import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource"
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource"

export interface AuthTokenRepositoryInterface {
    localDataSource: LocalTokenDataSource,
    remoteDataSource: GithubTokenDataSource,
    // need to be implemented in the data layer
    getCookiesAuthToken(): string,
    setNewAuthToken(exChangeCode: string): Promise<void>,
    removeAuthToken(): void,
}