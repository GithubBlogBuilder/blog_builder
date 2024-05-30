import Errors from "undici-types/errors";

export class GithubTokenDataSource{

    async exchangeGithubToken(code: string) : Promise<{accessToken: string, refreshToken: string}>{

        if(!code){
            throw new Error('No code provided')
        }

        const clientId = process.env.GITHUB_CLIENT_ID
        const clientSecret = process.env.GITHUB_CLIENT_SECRET

        if(clientId === undefined || clientSecret === undefined){
            throw new Error('No client id or client secret provided')
        }

        const postBody = {
            client_id: clientId,
            client_secret: clientSecret,
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