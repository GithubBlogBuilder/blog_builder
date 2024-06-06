import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkStatus } from "@/domain/usecases/LoginUseCase";

export async function middleware(request: NextRequest) {
    const nextCookies = cookies();
    const hasLogined = await checkStatus(nextCookies);
    console.log("middleware: hasLogined", hasLogined);

    if (request.url.includes("auth/login")) {
        if (hasLogined) {
            console.log(
                "middleware: try to access login page while already login"
            );
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return;
    }

    if (!hasLogined) {
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
