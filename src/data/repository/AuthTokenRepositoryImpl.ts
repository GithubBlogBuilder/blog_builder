import { AuthTokenRepositoryInterface } from "@/domain/repository/AuthTokenRepositoryInterface";
import { GithubTokenDataSource } from "../dataSource/github/GithubTokenDataSource";
import { LocalTokenDataSource } from "../dataSource/local/LocalTokenDataSource";

export class AuthTokenRepositoryImpl implements AuthTokenRepositoryInterface {
    localDataSource: LocalTokenDataSource;
    remoteDataSource: GithubTokenDataSource;

    constructor(
        localDataSource: LocalTokenDataSource,
        remoteDataSource: GithubTokenDataSource
    ) {
        this.localDataSource = localDataSource;
        this.remoteDataSource = remoteDataSource;
    }

    getAccessToken(): string {
        return this.localDataSource.getGithubAuthToken();
    }

    async authenticate(exchangeCode: string): Promise<any> {
        this.localDataSource.clearGithubAuthToken();

        // for testing purpose
        if (exchangeCode === "super_safe_test_code") {
            if (!process.env.TEST_ACCESS_TOKEN) {
                throw new Error("No test access token provided");
            }
            this.localDataSource.setGithubAuthToken(
                process.env.TEST_ACCESS_TOKEN
            );
            return;
        }

        if (exchangeCode === "invalid_code") {
            throw new Error("Invalid code");
        }

        const response =
            await this.remoteDataSource.exchangeGithubToken(exchangeCode);

        this.localDataSource.setGithubAuthToken(response.accessToken);
    }

    removeAccessToken() {
        this.localDataSource.clearGithubAuthToken();
    }
}
