import { AuthTokenRepositoryInterface } from '@/domain/repository/AuthTokenRepositoryInterface';
import { GithubTokenDataSource } from '../dataSource/github/GithubTokenDataSource';
import { LocalTokenDataSource } from '../dataSource/local/LocalTokenDataSource';

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
        return this.localDataSource.getAccessToken();
    }

    async authenticate(exchangeCode: string): Promise<any> {
        this.removeAccessToken();

        // for testing purpose
        if (exchangeCode === 'super_safe_test_code') {
            if (!process.env.TEST_ACCESS_TOKEN) {
                throw new Error('No test access token provided');
            }
            this.localDataSource.setAccessToken(process.env.TEST_ACCESS_TOKEN);
            return;
        }

        if (exchangeCode === 'invalid_code') {
            this.localDataSource.removeAccessToken();
            throw new Error('Invalid code');
        }
        const token =
            await this.remoteDataSource.exchangeGithubToken(exchangeCode);

        this.localDataSource.setAccessToken(token);
    }

    removeAccessToken() {
        this.localDataSource.removeAccessToken();
    }
}
