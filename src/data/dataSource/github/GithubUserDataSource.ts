import {
    GithubUserModel,
    jsonToGithubUserModel,
} from '@/data/models/GithubUserModel';

export class GithubUserDataSource {
    private readonly _accessToken: string = '';

    constructor(token: string) {
        this._accessToken = token;
    }

    async getUser(): Promise<GithubUserModel> {
        try {
            const response = await fetch('https://api.github.com/user', {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.raw+json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this._accessToken}`,
                },
            });

            const data = await response.json();
            return jsonToGithubUserModel(data);
        } catch (error) {
            throw error;
        }
    }
}
