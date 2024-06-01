"use server";
import { cookies } from "next/headers";
import { getGitHubUserData } from "@/domain/usecases/UserUseCase";

export async function getUserAction() {
    const nextCookies = cookies();

    return await getGitHubUserData(nextCookies);
}
