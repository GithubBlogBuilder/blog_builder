interface MongoUserDataModel {
    userId: string;
    blogRepoName: string | undefined;
    blogConfig: {
        templateIndex: number;
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
        templateOption: any;
    };
}
