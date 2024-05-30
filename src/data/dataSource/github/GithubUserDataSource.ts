import {
    GithubUserModel,
    toUserDataModel,
} from "@/data/models/GithubUserModel";

export class GithubUserDataSource {
    _headers = {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
    };
    private readonly _accessToken: string = "";
    constructor(token: string) {
        this._accessToken = token;
    }

    async getUser(): Promise<GithubUserModel> {
        try {
            const response = await fetch("https://api.github.com/user", {
                headers: {
                    ...this._headers,
                    Authorization: `Bearer ${this._accessToken}`,
                },
            });

            const data = await response.json();
            return toUserDataModel(data);
        } catch (error) {
            // console.error('error', error)
            throw error;
        }
    }
}
