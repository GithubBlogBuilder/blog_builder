"use server";
import { userModelToEntity } from "@/domain/entities/UserEntity";
import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";
import { UserRepositoryImpl } from "@/data/repository/UserRepositoryImpl";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";
import { MongoRepositoryImpl } from "@/data/repository/MongoRepositoryImpl";
import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";

export async function getGitHubUserData(cookies: ReadonlyRequestCookies) {
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

        return userModelToEntity(userModel);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMongoUserData(userId: number) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    const userData = await repo.getMongoUserData(userId);
    return userData;
}

export async function saveMongoUserData(userId: number, blogRepoName: string) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    await repo.saveMongoUserData(userId, blogRepoName);
}
