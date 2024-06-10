'use server';
import { cookies } from 'next/headers';
import {
    getUserData,
    isUserDeployed,
    updateMongoUserData,
} from '@/domain/usecases/UserUseCase';
import { UserEntity } from '@/domain/entities/UserEntity';

export async function getUserAction() {
    const nextCookies = cookies();
    return getUserData(nextCookies);
}

export async function updateUserDataAction(user: UserEntity) {
    await updateMongoUserData(user);
}

export async function checkUserDeployAction(
    user: UserEntity
): Promise<boolean> {
    return isUserDeployed({
        userId: user.userId,
        blogRepoName: user.blogRepoName,
        blogConfig: user.blogConfig,
    });
}

// export async function reRunGithubAction(user: UserEntity) {
//
// }
