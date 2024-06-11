const OAUTH_URL = 'https://github.com/login/oauth/access_token';

export class GithubTokenDataSource {
    async exchangeGithubToken(exchangeCode: string): Promise<string> {
        if (!exchangeCode) {
            throw new Error('No code provided');
        }

        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;

        if (clientId === undefined || clientSecret === undefined) {
            throw new Error('No client id or client secret provided');
        }

        const postBody = {
            client_id: clientId,
            client_secret: clientSecret,
            code: exchangeCode,
        };

        const response = await fetch(OAUTH_URL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        });

        const json = await response.json();
        if (json.status !== 200) {
            throw new Error('Failed to exchange code');
        }
        // console.log('GithubTokenDataSource: returned json ', json);
        return json['access_token'];
    }
}
