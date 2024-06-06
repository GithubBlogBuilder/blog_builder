"use server";
import { cookies } from "next/headers";
import {
    getUserData,
    updateMongoUserData,
} from "@/domain/usecases/UserUseCase";
import { UserEntity } from "@/domain/entities/UserEntity";

export async function getUserAction() {
    const nextCookies = cookies();

    return await getUserData(nextCookies);
}

export async function updateUserDataAction(user: UserEntity) {
    await updateMongoUserData(user);
}
