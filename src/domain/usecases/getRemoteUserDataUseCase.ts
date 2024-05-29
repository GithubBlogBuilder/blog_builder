"use server"
import {modelToEntity} from "@/domain/entities/UserEntity"
import {GithubUserDataSource} from "@/data/dataSource/GithubUserDataSource";
import {UserRepositoryImpl} from "@/data/repository/UserRepositoryImpl";
import type {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {LocalTokenDataSource} from "@/data/dataSource/LocalTokenDataSource";
import {AuthTokenRepositoryImpl} from "@/data/repository/AuthTokenRepositoryImpl";

export async function getRemoteUserDataUseCase(
    cookies: ReadonlyRequestCookies
) {
  try {
    // const accessToken = await getTokenUseCase()
    const localTokenDataSource = new LocalTokenDataSource(cookies)

    const tokenRepo = new AuthTokenRepositoryImpl()

    const accessToken = tokenRepo.getCookiesAuthToken(localTokenDataSource)

    if(accessToken.length === 0){
        return null
    }

    const userRepo = new UserRepositoryImpl(
        new GithubUserDataSource(accessToken)
    )
    const userModel = await userRepo.getUser()
    // const res = await getRemoteUserDataUseCase(userRepo)
    return modelToEntity(userModel)
  } catch (error) {
    console.log(error)
    return null
  }
}