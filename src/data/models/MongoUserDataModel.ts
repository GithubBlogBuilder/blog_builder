export interface MongoUserDataModel {
    userId: number;
    userName: string;
    blogRepoName: string | undefined;
    blogConfig: {
        templateIndex: number;
        templateOption: any;
        blogTitle: string;
        blogDescription: string;
        blogIntroduction: string;
        socialMedia: {
            github: string | undefined;
            linkedin: string | undefined;
            facebook: string | undefined;
            instagram: string | undefined;
            threads: string | undefined;
        };
    };
}

export function jsonToMongoUserDataModel(data: any): MongoUserDataModel {
    return {
        userId: data["userId"],
        userName: data["userName"],
        blogRepoName: data["blogRepoName"],
        blogConfig: JSON.parse(data["blogConfig"]),
    } as MongoUserDataModel;
}
