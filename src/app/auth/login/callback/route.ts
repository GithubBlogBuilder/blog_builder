import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { login } from "@/domain/usecases/LoginUseCase";

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
    if (!exchangeCode) {
        return NextResponse.json(
            { error: "No exchange code found!" },
            { status: 400 }
        );
    }

    try {
        const nextCookies = cookies();
        await login(exchangeCode, nextCookies);

        const githubUserData = await getUserData(nextCookies);
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
  
    let redirectUrl = "/dashboard";
    if (req.nextUrl.searchParams.get("installation_id") !== null) {
        redirectUrl += "?from_install=true";
    }

    return NextResponse.redirect(new URL(redirectUrl, req.nextUrl));
}
