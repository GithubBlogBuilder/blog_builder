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

export const socialMediaSchema = z.object({
    platform: Platform.nullable(),
    url: z.string().url("輸入社群媒體連結").nullable(),
});

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>;

export const formSchema = z.object({
    blogName: z
        .string()
        .min(1, "請輸入部落格名稱")
        .max(20, "部落格標題不可超過10字"),
    blogDescription: z
        .string()
        .min(1, "部落格描述不可為空")
        .max(100, "部落格描述不可超過100字"),
    blogHeadline: z
        .string()
        .min(1, "部落格首頁標題不可為空")
        .max(20, "部落格首頁標題不可超過100字"),
    socialMediaLinks: z.array(socialMediaSchema).nullable(),
});

export interface BlogMetadata {
    blogRepoName: string | undefined;
    blogConfig: {
        templateIndex: number;
        templateOption: any;
        blogTitle: string;
        blogDescription: string;
        blogHeadline: string;
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
