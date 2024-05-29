import Errors from "undici-types/errors";

export class GithubTokenDataSource{

    clientId: string
    clientSecret: string

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    async exchangeGithubToken(code: string) : Promise<{accessToken: string, refreshToken: string}>{

        if(!code){
            throw new Error('No code provided')
        }

        const postBody = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: code,
        }

        const  uri = "https://github.com/login/oauth/access_token"

        const response = await fetch(uri, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody),
        });

        const json = await response.json();

        // console.log(json);
        const accessToken = json["access_token"]
        const refreshToken = json["refresh_token"]
        console.log('exchangeGithubToken success')

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}