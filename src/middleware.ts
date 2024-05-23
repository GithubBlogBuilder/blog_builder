import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getRemoteUserDataUsecase} from "@/domain/usecases/getRemoteUserDataUsecase"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // console.log('middleware')
    // const accessToken = request.cookies.get('access_token')
    // console.log('cookie', accessToken)

    const user = await getRemoteUserDataUsecase()


    if(user === null){
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/dashboard/:path*',
    ]
}