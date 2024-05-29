import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl"
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource"
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource"
export async function checkLoginStatusInfo(cookies: any)  {

    const tokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    )
    const token = tokenRepo.getCookiesAuthToken()

    return token.length !== 0;


    // TODO: check token expired
}