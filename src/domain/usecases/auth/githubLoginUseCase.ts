import {TokenExchangeError} from "@/lib/errors";
import {GithubTokenDataSource} from "@/data/dataSource/github/GithubTokenDataSource";
import {LocalTokenDataSource} from "@/data/dataSource/local/LocalTokenDataSource";
import {AuthTokenRepositoryImpl} from "@/data/repository/AuthTokenRepositoryImpl";
import type {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function githubLoginUseCase(
    exChangeCode: string | null,
    clientID: string | undefined,
    clientSecret: string | undefined,
    cookies: ReadonlyRequestCookies,
){
    if(!exChangeCode){
        throw new TokenExchangeError('No code provided')
    }

    if(!clientID || !clientSecret){
        throw new TokenExchangeError('No clientID or clientSecret provided')
    }

    const remoteDataSource = new GithubTokenDataSource(
        clientID,
        clientSecret
    )

    const localDataSource = new LocalTokenDataSource(cookies)

    const repository = new AuthTokenRepositoryImpl()


    const res = await repository.setNewAuthToken(
        exChangeCode,
        localDataSource,
        remoteDataSource
    )
}