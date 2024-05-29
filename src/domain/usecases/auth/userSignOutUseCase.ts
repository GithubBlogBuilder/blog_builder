import type {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {LocalTokenDataSource} from "@/data/dataSource/LocalTokenDataSource";
import {AuthTokenRepositoryImpl} from "@/data/repository/AuthTokenRepositoryImpl";

export function userSignOutUseCase(cookies: ReadonlyRequestCookies){
    const localTokenDataSource = new LocalTokenDataSource(cookies)
    const tokenRepository = new AuthTokenRepositoryImpl()
    tokenRepository.removeAuthToken(localTokenDataSource)
}