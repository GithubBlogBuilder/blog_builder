import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { login, clearAccessToken } from '@/domain/usecases/LoginUseCase';
import {
    createNewUserData,
    getGithubUserData,
    getMongoUserData,
    getUserData,
    isUserDeployed,
} from '@/domain/usecases/UserUseCase';

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const exchangeCode = query.get('code');
    console.log('exchangeCode', exchangeCode);

    if (!exchangeCode) {
        return NextResponse.json(
            { error: 'No exchange code found!' },
            { status: 400 }
        );
    }
    const nextCookies = cookies();
    const originalUrl =
        req.nextUrl.protocol + req.headers.get('host') + req.nextUrl.pathname;

    try {
        await login(exchangeCode, nextCookies);

        const githubUserData = await getGithubUserData(nextCookies);
        if (!githubUserData) {
            return NextResponse.json(
                { error: 'Cannot get user data from GitHub' },
                { status: 400 }
            );
        }

        console.log('githubUserData', githubUserData);

        let mongoUserData = await getMongoUserData(githubUserData.userId).catch(
            () => null
        );

        if (!mongoUserData) {
            // no data found, create new data
            await createNewUserData(githubUserData.userId);
            mongoUserData = await getMongoUserData(githubUserData.userId);
        }

        console.log('mongoUserData', mongoUserData);

        const deployed = await isUserDeployed(mongoUserData);
        console.log('deployed', deployed);
        let redirectEndpoint = '/dashboard';
        if (!deployed) {
            redirectEndpoint = '/deploy';
        }

        // if (req.nextUrl.searchParams.get('installation_id') !== null) {
        //     redirectEndpoint += '?from_install=true';
        // }

        return NextResponse.redirect(new URL(redirectEndpoint, originalUrl));
    } catch (error) {
        clearAccessToken(nextCookies);
        return NextResponse.redirect(new URL('/auth/login', originalUrl));
    }
}
