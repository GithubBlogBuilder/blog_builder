import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkStatus } from "@/domain/usecases/LoginUseCase";

export async function middleware(request: NextRequest) {
    const nextCookies = cookies();
    const hasLogined = await checkStatus(nextCookies);
    console.log("middleware: hasLogined", hasLogined);

    const fromInstallation =
        request.nextUrl.searchParams.get("from_install") === "true";

    if (!hasLogined && !fromInstallation) {
        console.log("middleware: not login yet, redirect to login page");
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/dashboard/:path*", "/deploy/:path*"],
};
