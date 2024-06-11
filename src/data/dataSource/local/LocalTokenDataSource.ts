import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export class LocalTokenDataSource {
    cookies: ReadonlyRequestCookies;

    constructor(cookies: ReadonlyRequestCookies) {
        this.cookies = cookies;
    }

    getAccessToken() {
        const token = this.cookies.get('access_token');

        if (!token) {
            return '';
        }
        return token.value as string;
    }

    removeAccessToken() {
        // sign out
        this.cookies.delete('access_token');
    }

    setAccessToken(token: string) {
        this.cookies.set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 28800,
        });
        console.log('LocalTokenDataSource: setAccessToken', token);
    }
}
