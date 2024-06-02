import { issueModelToEntity, PostEntity } from "@/domain/entities/PostEntity";
import { GithubIssueDataSource } from "@/data/dataSource/github/GithubIssueDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";
import { IssueRepositoryImpl } from "@/data/repository/IssueRepositoryImpl";
export async function GetAllIssueUseCase(
    cookie: any,
    userName: string,
    repoName: string
): Promise<PostEntity[] | null> {
    const localTokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookie),
        new GithubTokenDataSource()
    );
    const token = localTokenRepo.getAccessToken();

    const issueRepo = new IssueRepositoryImpl(
        new GithubIssueDataSource(token, userName, repoName)
    );

    try {
        const issueList = await issueRepo.getIssues();
        // console.log(issueList);
        return issueList.map(issueModelToEntity);
    } catch (error) {
        console.log(error);
        return null;
    }
}
