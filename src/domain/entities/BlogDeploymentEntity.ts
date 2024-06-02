import { BlogTemplateMetaDataDto } from "@/domain/entities/BlogTemplateMetaDataDto";
import { UserEntity } from "@/domain/entities/UserEntity";

interface BlogDeploymentEntity {
    user: UserEntity;
    template: BlogTemplateMetaDataDto;
    github: {
        repoName: string;
    };
    blogConfig: {
        blogTitle: string;
        blogDescription: string;
        blogIntroduction: string;
        templateOption: any | undefined;
    };
    socialMedia: {
        github: string | undefined;
        linkedin: string | undefined;
        facebook: string | undefined;
        instagram: string | undefined;
        threads: string | undefined;
    };
}
