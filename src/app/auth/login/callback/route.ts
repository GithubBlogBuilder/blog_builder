import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { login } from "@/domain/usecases/auth/LoginUseCase";

import { TokenExchangeError } from "@/lib/errors";
import {
    checkUserDeployState,
    createNewUserData,
    getMongoUserData,
    getUserData,
} from "@/domain/usecases/UserUseCase";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const exchangeCode = query.get("code");
    const nextCookies = cookies();

    // console.log("callback: get exchange code", exchangeCode);

    try {
        await login(exchangeCode, nextCookies);

        const githubUserData = await getUserData(nextCookies);
        // console.log("login route callback: githubUserData", githubUserData);

        if (!githubUserData) {
            return NextResponse.json(
                { error: "Cannot get user data from GitHub" },
                { status: 400 }
            );
        }
        const userDeployState = await checkUserDeployState(
            githubUserData.userId
        );
        if (userDeployState) {
            return NextResponse.redirect(new URL("/deploy", req.nextUrl));
        } else {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
    } catch (error) {
        if (error instanceof TokenExchangeError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}
