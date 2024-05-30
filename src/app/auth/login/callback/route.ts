import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { login } from "@/domain/usecases/auth/LoginUseCase";

import { TokenExchangeError } from "@/lib/errors";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const exchangeCode = query.get("code");
    const nextCookies = cookies();

    console.log("callback: get exchange code", exchangeCode);

    try {
        await login(exchangeCode, nextCookies);
    } catch (error) {
        if (error instanceof TokenExchangeError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }

    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
}
