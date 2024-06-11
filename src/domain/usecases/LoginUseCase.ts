import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';
import { UserRepositoryImpl } from '@/data/repository/UserRepositoryImpl';
import { GithubUserDataSource } from '@/data/dataSource/github/GithubUserDataSource';

// TODO: check token expired
export async function checkStatus(cookies: any) {
    const tokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );
    const token = tokenRepo.getAccessToken();
    console.log('checkStatus: token', token);

    if (token.length === 0) {
        return '/landing_page';
    }

    const userRepo = new UserRepositoryImpl(new GithubUserDataSource(token));

    try {
        await userRepo.getUser();
        return '';
    } catch (e) {
        console.log('error', e);
        return '/auth/login';
    }
}

export async function login(exchangeCode: string, cookies: any) {
    const repository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    await repository.authenticate(exchangeCode);
}

export function clearAccessToken(cookies: ReadonlyRequestCookies) {
    const repository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    repository.removeAccessToken();
}
