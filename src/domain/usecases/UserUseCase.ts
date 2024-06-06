"use server";
import {
    EmptyUser,
    githubUserModelToEntity,
    UserEntity,
    userModelToEntity,
} from "@/domain/entities/UserEntity";
import { GithubUserDataSource } from "@/data/dataSource/github/GithubUserDataSource";
import { UserRepositoryImpl } from "@/data/repository/UserRepositoryImpl";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";
import { MongoRepositoryImpl } from "@/data/repository/MongoRepositoryImpl";
import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import {
    emptyMongoUserDataModel,
    MongoUserDataModel,
} from "@/data/models/MongoUserDataModel";
import mongodb from "@/lib/mongodb";

export async function getUserData(cookies: ReadonlyRequestCookies) {
    try {
        // get access token from cookies
        const tokenRepo = new AuthTokenRepositoryImpl(
            new LocalTokenDataSource(cookies),
            new GithubTokenDataSource()
        );

        const accessToken = tokenRepo.getAccessToken();

        if (accessToken.length === 0) {
            // console.log("getUserData: user not logged in")
            return EmptyUser;
        }

        // get user data from github
        const userRepo = new UserRepositoryImpl(
            new GithubUserDataSource(accessToken)
        );
        const userModel = await userRepo.getUser();

        // console.log("userModel", userModel);
        // get user data from mongo
        const mongoUserData = await getMongoUserData(userModel.id);

        // console.log("mongoUserData", mongoUserData);
        return userModelToEntity(userModel, mongoUserData);
    } catch (error) {
        console.log("get user data error", error);
        return EmptyUser;
    }
}

export async function checkUserDeployState(userId: number) {
    const mongoUserData = await getMongoUserData(userId);
    return (
        mongoUserData.blogRepoName === undefined ||
        mongoUserData.blogRepoName.length === 0
    );
}

export async function getMongoUserData(userId: number) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    const userData = await repo.getMongoUserData(userId);
    if (userData === undefined) {
        console.log("Cannot get user data from MongoDB");

        await createNewUserData(userId);

        return await getMongoUserData(userId);
    }
    return userData;
}

export async function updateMongoUserData(userData: UserEntity) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    const mongoUserData: MongoUserDataModel = {
        userId: userData.userId,
        blogRepoName: userData.blogRepoName,
        blogConfig: userData.blogConfig,
    };
    await repo.saveMongoUserData(userData.userId, mongoUserData);
}

// export async function saveMongoUserData(userId: number, blogRepoName: string) {
//     const repo = new MongoRepositoryImpl(new MongoUserDataSource());
//     await repo.saveMongoUserData(userId, {
//         blogRepoName: blogRepoName,
//     } as MongoUserDataModel);
// }

export async function createNewUserData(userId: number) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    await repo.createNewUserData(userId);
    return await getMongoUserData(userId);
}
