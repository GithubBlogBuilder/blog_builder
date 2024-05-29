import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { LocalTokenDataSource } from "@/data/dataSource/local/LocalTokenDataSource";
import { AuthTokenRepositoryImpl } from "@/data/repository/AuthTokenRepositoryImpl";
import { GithubTokenDataSource } from "@/data/dataSource/github/GithubTokenDataSource";
export function userSignOutUseCase(cookies: ReadonlyRequestCookies) {
    const localTokenDataSource = new LocalTokenDataSource(cookies);
    const tokenRepository = new AuthTokenRepositoryImpl(
        new LocalTokenDataSource(cookies),
        new GithubTokenDataSource()
    );
    tokenRepository.removeAuthToken();
}
