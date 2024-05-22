import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const code = query.get("code");
    console.log("code", code);

    const postBody = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
    };

    console.log("post body", postBody);

    if (!code)
        return NextResponse.json(
            { error: "No code provided" },
            { status: 400 }
        );

    const uri = "https://github.com/login/oauth/access_token";
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });

    const json = await response.json();

    console.log(json);
    const accessToken = json["access_token"];
    const refreshToken = json["refresh_token"];

    console.log("access token", accessToken);
    console.log("refresh token", refreshToken);

    // store access token in session
    cookies().set({
        name: "access_token",
        value: accessToken,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });
    cookies().set({
        name: "refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

    return NextResponse.redirect(new URL("/", req.nextUrl));
}
