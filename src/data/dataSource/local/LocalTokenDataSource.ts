import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class LocalTokenDataSource {
    cookies: ReadonlyRequestCookies;

    constructor(cookies: ReadonlyRequestCookies) {
        this.cookies = cookies;
    }

    getGithubAuthToken() {
        const token = this.cookies.get("access_token");
        if (token === undefined) {
            return "";
        }
        return token.value as string;
    }

    clearGithubAuthToken() {
        // sign out
        this.cookies.set("access_token", "", {
            maxAge: 0,
        });
    }

    setGithubAuthToken(token: string) {
        this.cookies.set({
            name: "access_token",
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }
}
