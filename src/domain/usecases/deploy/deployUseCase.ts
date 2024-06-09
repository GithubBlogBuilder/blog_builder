import { UserEntity } from '@/domain/entities/UserEntity';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { BlogDeployRepositoryImpl } from '@/data/repository/BlogDeployRepositoryImpl';
import { GithubRepoDataSource } from '@/data/dataSource/github/GithubRepoDataSource';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function deployUseCase(
    cookies: ReadonlyRequestCookies,
    userData: UserEntity
) {
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

    try {
        await blogDeployRepository.createRemoteRepository(
            userData.githubUser.userName,
            userData.blogRepoName
        );
    } catch (error) {
        return false;
    }

    return true;
}
