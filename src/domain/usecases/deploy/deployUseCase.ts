import { UserEntity } from '@/domain/entities/UserEntity';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
// import { IssueRepositoryImpl } from '@/data/repository/IssueRepositoryImpl';
// import { GithubIssueDataSource } from '@/data/dataSource/github/GithubIssueDataSource';
import { BlogDeployRepositoryImpl } from '@/data/repository/BlogDeployRepositoryImpl';
import { GithubRepoDataSource } from '@/data/dataSource/github/GithubRepoDataSource';

export async function deployUseCase({
    cookie,
    userData,
}: {
    cookie: any;
    userData: UserEntity;
}) {
    const localTokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookie),
        new GithubTokenDataSource()
    );

    const token = localTokenRepo.getAccessToken();
    if (!token) {
        throw new Error('No access token found');
    }

    const blogDeployRepository = new BlogDeployRepositoryImpl(
        new GithubRepoDataSource(token)
    );

    if (!userData.blogRepoName) {
        throw new Error('No github username found');
    }
    try {
        await blogDeployRepository.createRemoteRepository(
            userData.githubUser.userName,
            userData.blogRepoName
        );
    } catch (error) {
        if (error.type === 'repo_already_exists') {
            console.log('repo already exists');
            return false;
        }
    }

    return true;
}
