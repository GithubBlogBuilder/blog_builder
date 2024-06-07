import { GithubUserModel } from "@/data/models/GithubUserModel";
import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";

export interface GithubUserEntity {
    userName: string;
    userId: number;
    avatarUrl: string;
}

export interface UserEntity {
    userId: number;
    githubUser: GithubUserEntity;
    blogRepoName: string | undefined;
    blogConfig: {
        templateIndex: number;
        templateOption: any;
        blogName: string;
        blogDescription: string;
        blogHeadline: string;
        socialMedia: {
            github: string | null;
            linkedin: string | null;
            facebook: string | null;
            instagram: string | null;
            threads: string | null;
            youtube: string | null;
        };
    };
}

export function githubUserModelToEntity(
    githubUserModel: GithubUserModel
): GithubUserEntity {
    return {
        userName: githubUserModel.login,
        userId: githubUserModel.id,
        avatarUrl: githubUserModel.avatarUrl,
    };
}

export function userModelToEntity(
    githubUserModel: GithubUserModel,
    mongoUserData: MongoUserDataModel
): UserEntity {
    return {
        userId: mongoUserData.userId,
        githubUser: githubUserModelToEntity(githubUserModel),
        blogRepoName: mongoUserData.blogRepoName,
        blogConfig: mongoUserData.blogConfig,
    };
}

export const EmptyUser: UserEntity = {
    userId: -1,
    githubUser: {
        userName: "error",
        userId: -1,
        avatarUrl: "",
    },
    blogRepoName: "",
    blogConfig: {
        templateIndex: 0,
        templateOption: {},
        blogName: "",
        blogDescription: "",
        blogHeadline: "",
        socialMedia: {
            github: null,
            linkedin: null,
            facebook: null,
            instagram: null,
            threads: null,
            youtube: null,
        },
    },
};
