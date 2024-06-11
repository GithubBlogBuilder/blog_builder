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
    const hasLogined = await checkStatus(nextCookies);

    if (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/landing_page')) {
        if (hasLogined) {
            console.log('middleware: already login, redirect to dashboard');
            return NextResponse.redirect(new URL('/dashboard', orginalUrl));
        } else {
            console.log('middleware: not login yet, continue to page');
            return NextResponse.next();
        }
    }

    if (!hasLogined) {
        console.log('middleware: not login yet, redirect to landing page');
        return NextResponse.redirect(new URL('/landing_page', orginalUrl));
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
