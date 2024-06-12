import { getUserData, getUserDataByName } from "@/domain/usecases/UserUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const headers = req.headers;;

    const username = query.get("username") ?? "";
    const token = headers.get("token") ?? "";

    console.log(username);
    console.log(token);

    const user = await getUserDataByName(username, token);

    const response = NextResponse.json(
        user,
        { status: 200 },
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Token');

    return response;
}

export async function OPTIONS(req: NextRequest) {
    const response = new NextResponse();

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Token');
    response.headers.set('Access-Control-Max-Age', '86400');

    return response;
}