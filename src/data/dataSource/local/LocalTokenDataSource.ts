import type {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";


export class LocalTokenDataSource{
    cookies: ReadonlyRequestCookies
    static accessTokenKey = 'access_token'
    static refreshTokenKey = 'refresh_token'
    constructor(cookies: ReadonlyRequestCookies){
        this.cookies = cookies
    }
    getGithubAuthToken(){
        const token =  this.cookies.get(
            LocalTokenDataSource.accessTokenKey
        )
        if(token === undefined ){
            return ''
        }
        return token.value as string
    }

    clearGithubAuthToken(){
        // sign out
        this.cookies.set(LocalTokenDataSource.accessTokenKey, '', {
            maxAge: 0
        })
    }

    setGithubAuthToken(token: string){
        this.cookies.set({
            name: LocalTokenDataSource.accessTokenKey,
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }

    setGithubRefreshToken(token: string){
        this.cookies.set({
            name: LocalTokenDataSource.refreshTokenKey,
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }
}