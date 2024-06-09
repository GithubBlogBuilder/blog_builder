import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { TokenExchangeError } from '@/lib/errors';
import { GithubTokenDataSource } from '@/data/dataSource/github/GithubTokenDataSource';
import { LocalTokenDataSource } from '@/data/dataSource/local/LocalTokenDataSource';
import { AuthTokenRepositoryImpl } from '@/data/repository/AuthTokenRepositoryImpl';

// TODO: check token expired
export async function checkStatus(cookies: any) {
    const tokenRepo = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );
    const token = tokenRepo.getAccessToken();

    return token.length !== 0;
}

export async function login(exchangeCode: string, cookies: any) {
    const repository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    await repository.authenticate(exchangeCode);
}

export function signOut(cookies: ReadonlyRequestCookies) {
    const repository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );

    repository.removeAccessToken();
}
