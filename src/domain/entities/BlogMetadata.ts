import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";
import { z } from "zod";

export const Platform = z.enum([
    "github",
    "linkedin",
    "facebook",
    "instagram",
    "threads",
    "youtube",
    "github",
]);

export type PlatformType = z.infer<typeof Platform>;
export const AllValidSocialMediaOptionList = Object.keys(Platform.enum).map(
    (key) => key as PlatformType
);

export const socialMediaSchema = z.object({
    platform: Platform.nullable(),
    url: z.string().url("輸入社群媒體連結").nullable(),
});

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>;

export const blogConfigFormSchema = z.object({
    blogName: z
        .string()
        .min(1, "請輸入部落格名稱")
        .max(20, "部落格名稱不可超過10字"),
    blogDescription: z.string().min(1, "部落格描述不可為空"),
    blogHeadline: z.string().min(1, "部落格首頁標題不可為空"),
    socialMediaLinks: z.array(socialMediaSchema).nullable(),
});

export type BlogConfigDataEntity = z.infer<typeof blogConfigFormSchema>;

export interface BlogMetadata {
    blogRepoName: string | undefined;
    blogConfig: BlogConfigDataEntity | undefined;
}

export function modelToEntity(data: MongoUserDataModel) {
    return {
        blogRepoName: data.blogRepoName,
        blogConfig: {
            blogName: data.blogConfig.blogTitle,
            blogDescription: data.blogConfig.blogDescription,
            blogHeadline: data.blogConfig.blogHeadline,
            socialMediaLinks: Object.entries(data.blogConfig.socialMedia).map(
                ([platform, url]) => ({
                    platform: platform as PlatformType,
                    url,
                })
            ),
        },
    } as BlogMetadata;
}
