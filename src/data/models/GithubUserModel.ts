export interface GithubUserModel {
    login: string;
    id: number;
    avatarUrl: string;
}

export function jsonToGithubUserModel(data: any): GithubUserModel {
    return {
        login: data["login"],
        id: data["id"],
        avatarUrl: data["avatar_url"],
    } as GithubUserModel;
}
