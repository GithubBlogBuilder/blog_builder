import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkStatus } from "@/domain/usecases/LoginUseCase";

export async function middleware(request: NextRequest) {
    const nextCookies = cookies();
    const hasLogIn = await checkStatus(nextCookies);

    if (
        request.url.includes("auth/login") ||
        request.url.includes("landing_page")
    ) {
        if (hasLogIn) {
            console.log(
                "middleware: try to access login page while already login"
            );
            return NextResponse.redirect(new URL("/", request.url));
        }
        return;
    }

    if (!hasLogIn) {
        return NextResponse.redirect(new URL("/landing_page", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/landing_page/:path*",
        "/dashboard/:path*",
        "/deploy/:path*",
        "/auth/login",
    ],
};
