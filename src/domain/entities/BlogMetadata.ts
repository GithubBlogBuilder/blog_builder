import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";
import { z } from "zod";

export enum Platform {
    github = "github",
    linkedin = "linkedin",
    facebook = "facebook",
    instagram = "instagram",
    threads = "threads",
    youtube = "youtube",
}

export const validSocialMediaOptionList = Object.keys(Platform) as Platform[];

export interface SocialMediaFormData {
    platform: Platform;
    url: string;
}

interface BlogConfigEntity {
    blogName: string;
    blogDescription: string;
    blogHeadline: string;
    socialMediaLinks: SocialMediaFormData[];
}
