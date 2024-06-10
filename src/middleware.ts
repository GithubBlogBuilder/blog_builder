import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkStatus } from '@/domain/usecases/LoginUseCase';

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

    const nextCookies = cookies();
    const hasLogined = await checkStatus(nextCookies);

    if (hasLogined) return NextResponse.next();

    const fromInstallation =
        request.nextUrl.searchParams.get('from_install') === 'true';

    if (!fromInstallation) {
        console.log('middleware: not login yet, redirect to landing page');
        return NextResponse.redirect(new URL('/landing_page', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/deploy/:path*', '/api/:path*'],
};
