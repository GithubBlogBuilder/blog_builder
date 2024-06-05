import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";

export interface AuthTokenRepositoryInterface {
    localDataSource: LocalTokenDataSource;
    remoteDataSource: GithubTokenDataSource;

    getAccessToken(): string;
    authenticate(exchangeCode: string): Promise<void>;
    removeAccessToken(): void;
}
