import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRemoteUserDataUseCase } from "@/domain/usecases/getRemoteUserDataUseCase";
import { cookies } from "next/headers";
import { checkStatus } from "@/domain/usecases/auth/LoginUseCase";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // console.log('middleware')
    // const accessToken = request.cookies.get('access_token')
    // console.log('cookie', accessToken)
    console.log("middleware check user info");

    const nextCookies = cookies();
    const isLogin = await checkStatus(nextCookies);
    console.log("isLogin", isLogin);

    if (request.url.includes("auth/login")) {
        if (isLogin) {
            console.log("try to access login page while already login");
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return;
    }

    if (!isLogin) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/dashboard/:path*",
        "/deploy/:path*",
        "/auth/login",
    ],
};
