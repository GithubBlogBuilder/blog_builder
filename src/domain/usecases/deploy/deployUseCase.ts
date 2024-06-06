import { MongoRepositoryInterface } from "@/domain/repository/MongoRepositoryInterface";
import {
    BlogConfigDataEntity,
    SocialMediaFormData,
} from "@/domain/entities/BlogMetadata";
import { MongoRepositoryImpl } from "@/data/repository/MongoRepositoryImpl";
import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";

export async function getBlogConfigUseCase(
    userId: number
): Promise<BlogConfigDataEntity> {
    const mongoRepo = new MongoRepositoryImpl(new MongoUserDataSource());
    const userData = await mongoRepo.getMongoUserData(userId);

    if (userData === undefined) {
        console.log("Cannot get user data from MongoDB");
        return {
            blogName: "",
            blogHeadline: "",
            blogDescription: "",
            socialMediaLinks: [],
        } as BlogConfigDataEntity;
    }

    let SocialMediaFormData: SocialMediaFormData[] = [];

    // for(let key in userData.blogConfig.socialMedia) {
    //     if(userData.blogConfig.socialMedia[key].url === undefined) {
    //         continue;
    //     }else{
    //         SocialMediaFormData.push({
    //             platform: key,
    //             url: userData.blogConfig.socialMedia[key].url
    //     });
    //     }
    //
    // }

    // const socialMediaLinks = (Object.keys(userData.blogConfig.socialMedia)??[]).map((key) => {
    //     return {
    //         platform: key,
    //         url: userData.blogConfig.socialMedia[key].url ?? ""
    //     } as SocialMediaFormData;
    // });

    console.log("userData", userData);

    return {
        blogName: userData?.blogConfig.blogName,
        blogHeadline: userData?.blogConfig.blogHeadline,
        blogDescription: userData?.blogConfig.blogDescription,
        socialMediaLinks: [],
    } as BlogConfigDataEntity;

    // return undefined;
}
