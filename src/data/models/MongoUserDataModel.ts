export interface SocialMediaListObject {
    github: string | null;
    linkedin: string | null;
    facebook: string | null;
    instagram: string | null;
    threads: string | null;
    youtube: string | null;
}
export interface MongoUserDataModel {
    userId: number;
    blogRepoName: string | undefined;
    blogConfig: {
        templateIndex: number;
        templateOption: any;
        blogName: string;
        blogDescription: string;
        blogHeadline: string;
        socialMedia: SocialMediaListObject;
    };
}

export const emptyMongoUserDataModel: MongoUserDataModel = {
    userId: 0,
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

export function jsonToMongoUserDataModel(data: any): MongoUserDataModel {
    return {
        userId: data["userId"],
        blogRepoName: data["blogRepoName"],
        blogConfig: data["blogConfig"],
    } as MongoUserDataModel;
}
