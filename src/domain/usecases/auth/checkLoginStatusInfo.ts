import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl"
import { LocalTokenDataSource } from "@/data/dataSource/LocalTokenDataSource"
export async function checkLoginStatusInfo(cookies: any)  {

    const tokenRepo = new AuthTokenRepositoryImpl()
    const token = tokenRepo.getCookiesAuthToken(
        new LocalTokenDataSource(cookies)
    )

    if(token.length === 0){
        return false
    }

    return true
    // TODO: check token expired
}