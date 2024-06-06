import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { checkStatus } from "@/domain/usecases/LoginUseCase";
import { getUserData } from "@/domain/usecases/UserUseCase";
export async function GET(req: NextRequest) {
    const nextCookies = cookies();
    // const hasLogIn = await checkStatus(nextCookies);
    const user = await getUserData(nextCookies);

    if (user.userId !== -1) {
        if (user.blogRepoName !== "") {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
        return NextResponse.redirect(new URL("/deploy", req.nextUrl));
    }

    return NextResponse.redirect(new URL("/landing_page", req.nextUrl));
}
