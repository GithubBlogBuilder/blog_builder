import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getUserDataAction} from "@/actions/getUserDataAction";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log('middleware')
    // const accessToken = request.cookies.get('access_token')
    // console.log('cookie', accessToken)

    const user = await getUserDataAction()


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