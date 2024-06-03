import { MongoRepositoryInterface } from "@/domain/repository/MongoRepositoryInterface";
import { BlogConfigDataEntity } from "@/domain/entities/BlogMetadata";

export async function getBlogConfigUseCase(
    mongoRepo: MongoRepositoryInterface,
    userId: number
): Promise<BlogConfigDataEntity> {
    // const userData = await mongoRepo.getMongoUserData(userId);
    // console.log(userData);
    // if(userD)
    // return userData;

    return {
        blogName: "QUAN の BLOG",
        blogHeadline: "Everything Happens for the Best",
        blogDescription:
            "這是百寬的個人部落格，專門分享平日的開發、設計與一些隨處迸發的靈感。",
        socialMediaLinks: [
            { platform: "github", url: "https://github.com" },
            { platform: "linkedin", url: "https://linkedin.com" },
        ],
    } as BlogConfigDataEntity;

    // return undefined;
}
