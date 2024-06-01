import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";

export interface BlogMetadata {
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

export function modelToEntity(data: MongoUserDataModel) {
    return {
        blogRepoName: data.blogRepoName,
        blogConfig: data.blogConfig,
    } as BlogMetadata;
}
