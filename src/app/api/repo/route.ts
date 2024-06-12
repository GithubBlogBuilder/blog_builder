import { getUserData, getUserDataWithToken } from "@/domain/usecases/UserUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    
    const token = query.get('token');

    const user = await getUserDataWithToken(token!);

    return NextResponse.json(
        user,
        { status: 200 }
    );
}