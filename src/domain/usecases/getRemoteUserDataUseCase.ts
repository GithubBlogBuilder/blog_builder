"use server";
import { modelToEntity } from "@/domain/entities/UserEntity";
import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";
import { UserRepositoryImpl } from "@/data/repository/UserRepositoryImpl";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";

export async function getRemoteUserDataUseCase(
    cookies: ReadonlyRequestCookies
) {
    try {
        const tokenRepo = new AuthTokenRepositoryImpl(
            new LocalTokenDataSource(cookies),
            new GithubTokenDataSource()
        );

        const accessToken = tokenRepo.getAccessToken();

        if (accessToken.length === 0) {
            return null;
        }

        const userRepo = new UserRepositoryImpl(
            new GithubUserDataSource(accessToken)
        );
        const userModel = await userRepo.getUser();
        return modelToEntity(userModel);
    } catch (error) {
        console.log(error);
        return null;
    }
}
