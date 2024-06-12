'use server';
import {
    EmptyUser,
    githubUserModelToEntity,
    UserEntity,
    userModelToEntity,
} from '@/domain/entities/UserEntity';
import { GithubUserDataSource } from '@/data/dataSource/github/GithubUserDataSource';
import { UserRepositoryImpl } from '@/data/repository/UserRepositoryImpl';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { MongoRepositoryImpl } from '@/data/repository/MongoRepositoryImpl';
import { MongoUserDataSource } from '@/data/dataSource/mongo/MongoUserDataSource';
import { MongoUserDataModel } from '@/data/models/MongoUserDataModel';

export async function isUserDeployed(mongoUserData: MongoUserDataModel) {
    return (mongoUserData.blogRepoName &&
        mongoUserData.blogRepoName.length > 0) as boolean;
}

export async function getUserData(cookies: ReadonlyRequestCookies) {
    try {
        // get access token from cookies
        const tokenRepo = new AuthTokenRepositoryImpl(
            new LocalTokenDataSource(cookies),
            new GithubTokenDataSource()
        );

        const accessToken = tokenRepo.getAccessToken();

        if (accessToken.length === 0) {
            console.log('getUserData: user not logged in');
            return EmptyUser;
        }

        // get user data from github
        const userRepo = new UserRepositoryImpl(
            new GithubUserDataSource(accessToken)
        );

        const userModel = await userRepo.getUser();
        const mongoUserData = await getMongoUserData(userModel.id);
        return userModelToEntity(userModel, mongoUserData);
    } catch (error) {
        return EmptyUser;
    }
}

export async function getUserDataByName(username: string, accessToken: string) {
    try {
        // get user data from github
        const userRepo = new UserRepositoryImpl(
            new GithubUserDataSource(accessToken)
        );

        const userModel = await userRepo.getUserByName(username);
        const mongoUserData = await getMongoUserData(userModel.id);
        return userModelToEntity(userModel, mongoUserData);
    } catch (error) {
        return EmptyUser;
    }
}

export async function getGithubUserData(cookies: ReadonlyRequestCookies) {
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

    const githubUserModel = await userRepo.getUser();
    return githubUserModelToEntity(githubUserModel);
}

export async function getMongoUserData(userId: number) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    return await repo.getMongoUserData(userId);
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

export async function createNewUserData(userId: number) {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    return await repo.createNewUserData(userId);
}
