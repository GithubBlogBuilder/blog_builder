import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { githubLoginUseCase } from "@/domain/usecases/auth/githubLoginUseCase";
import { TokenExchangeError } from "@/lib/errors";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const exChangeCode = query.get("code");
    const nextCookies = cookies();
    console.log("get exchange code", exChangeCode);

    try {
        await githubLoginUseCase(exChangeCode, nextCookies);
    } catch (error) {
        if (error instanceof TokenExchangeError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }

    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
}
