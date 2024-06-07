import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { login } from "@/domain/usecases/LoginUseCase";

import { TokenExchangeError } from "@/lib/errors";
import {
    getGitHubUserData,
    getMongoUserData,
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

    console.log("callback: got exchange code", exchangeCode);

    try {
        const nextCookies = cookies();
        await login(exchangeCode, nextCookies);

        const githubUserData = await getGitHubUserData(nextCookies);
        console.log("callback: githubUserData", githubUserData);

        if (!githubUserData) {
            return NextResponse.json(
                { error: "Cannot get user data from GitHub" },
                { status: 400 }
            );
        }

        const mongoUserData = await getMongoUserData(githubUserData.userId);
        console.log("callback: mongoUserData", mongoUserData);
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
