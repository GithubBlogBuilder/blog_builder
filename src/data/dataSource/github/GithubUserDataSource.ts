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

            if (response.status !== 200) {
                return Promise.reject(response.statusText);
            }
            const data = await response.json();

            return jsonToGithubUserModel(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getUserByName(username: string): Promise<GithubUserModel> {
        try {
            const response = await fetch(`https://api.github.com/user/${username}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.raw+json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this._accessToken}`,
                },
            });

            if (response.status !== 200) {
                return Promise.reject(response.statusText);
            }
            const data = await response.json();

            return jsonToGithubUserModel(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
