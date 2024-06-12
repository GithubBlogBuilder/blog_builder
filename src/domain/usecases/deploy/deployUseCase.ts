import { UserEntity } from '@/domain/entities/UserEntity';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { BlogDeployRepositoryImpl } from '@/data/repository/BlogDeployRepositoryImpl';
import { GithubRepoDataSource } from '@/data/dataSource/github/GithubRepoDataSource';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { MongoRepositoryImpl } from '@/data/repository/MongoRepositoryImpl';
import { MongoUserDataSource } from '@/data/dataSource/mongo/MongoUserDataSource';
import * as process from 'process';
import { GithubAPIError } from '@/lib/errors';

export async function deployUseCase(
    cookies: ReadonlyRequestCookies,
    userData: UserEntity
) {
    if (!userData.blogRepoName) {
        throw new Error('Invalid blog repo name');
    }

    console.log('start deploy use case with repoName', userData.blogRepoName);

    const tokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    const token = tokenRepo.getAccessToken();
    if (!token) {
        throw new Error('No access token found');
    }

    const blogDeployRepository = new BlogDeployRepositoryImpl(
        new GithubRepoDataSource(token)
    );

    try {
        await blogDeployRepository.createRemoteRepository(
            userData.githubUser.userName,
            userData.blogRepoName
        );

        await blogDeployRepository.enableGithubPages(
            userData.githubUser.userName,
            userData.blogRepoName
        );

        await blogDeployRepository.setRepoVariable(
            userData.githubUser.userName,
            userData.blogRepoName,
            'TOKEN',
            process.env.GITHUB_TOKEN as string
        );
    } catch (error) {
        console.error('deployUseCase: error', error);
        if (error instanceof GithubAPIError && error.statusCode === 422) {
            console.log('forkTemplateRepo: Repo already exists');
            return {
                status: 422,
                message: '已存在相同命名的 repo 請重新命名',
            };
        }
        if (error instanceof GithubAPIError && error.statusCode === 403) {
            console.log('Resource not accessible by integration\n');
            return {
                status: 403,
                message: '請確認 Github Token 是否有足夠權限',
            };
        }
        return {
            status: 0,
            message: '部署失敗',
        };
    }

    return null;
}

export async function archiveRepoUseCase(
    cookies: ReadonlyRequestCookies,
    userData: UserEntity
) {
    console.log('archiveRepoUseCase');
    if (!userData.blogRepoName) {
        throw new Error('Invalid blog repo name');
    }

    const tokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    const token = tokenRepo.getAccessToken();
    if (!token) {
        throw new Error('No access token found');
    }

    const blogDeployRepository = new BlogDeployRepositoryImpl(
        new GithubRepoDataSource(token)
    );

    await blogDeployRepository.deleteRemoteRepository(
        userData.githubUser.userName,
        userData.blogRepoName
    );

    console.log('archiveRepoUseCase: repo deleted successfully');
    const mongoUserRepo = new MongoRepositoryImpl(new MongoUserDataSource());

    await mongoUserRepo.deleteMongoUserData(userData.githubUser.userId);
    console.log('archiveRepoUseCase: user data deleted successfully');

    await mongoUserRepo.createNewUserData(userData.githubUser.userId);
    console.log('archiveRepoUseCase: new user data created successfully');
}
