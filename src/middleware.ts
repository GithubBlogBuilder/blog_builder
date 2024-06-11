import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkStatus } from '@/domain/usecases/LoginUseCase';
import { isUserDeployed } from './domain/usecases/UserUseCase';

export async function middleware(request: NextRequest) {
    // allow CORS for API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const res = NextResponse.next();
        res.headers.append('Access-Control-Allow-Credentials', 'true');
        res.headers.append('Access-Control-Allow-Origin', '*');
        res.headers.append(
            'Access-Control-Allow-Methods',
            'GET,DELETE,PATCH,POST,PUT'
        );
        res.headers.append(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
        return res;
    }

    const orginalUrl =
        request.nextUrl.protocol +
        request.headers.get('host') +
        request.nextUrl.pathname;

    const nextCookies = cookies();
    const redirectRoute = await checkStatus(nextCookies);

    const hasLogined = redirectRoute.length === 0;
    console.log('middleware: hasLogined', hasLogined);

    if (request.nextUrl.pathname.startsWith('/auth/login')) {
        if (!hasLogined) {
            return NextResponse.next();
        } else {
            console.log('middleware: already login, redirect to dashboard');
            return NextResponse.redirect(new URL('/dashboard', orginalUrl));
        }
    }

    if (request.nextUrl.pathname.startsWith('/landing_page')) {
        if (!hasLogined) {
            return redirectRoute === '/landing_page'
                ? NextResponse.next()
                : NextResponse.redirect(new URL(redirectRoute, orginalUrl));
        } else {
            console.log('middleware: already login, redirect to dashboard');
            return NextResponse.redirect(new URL('/dashboard', orginalUrl));
        }
    }

    if (!hasLogined) {
        // console.log('middleware: not login yet, redirect to landing page');
        // if (redirectRoute === request.nextUrl.pathname) {
        //     return NextResponse.next();
        // }
        return NextResponse.redirect(new URL(redirectRoute, orginalUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/landing_page',
        '/dashboard/:path*',
        '/deploy/:path*',
        '/api/:path*',
        '/auth/login/',
    ],
};
