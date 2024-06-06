import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";
import { BlogTemplateMetaDataModel } from "@/data/models/BlogTemplateDataModel";

export interface MongoRepositoryInterface {
    dataSource: MongoUserDataSource;

    getMongoUserData(userId: number): Promise<MongoUserDataModel | undefined>;
    saveMongoUserData(
        userId: number,
        MongoUserDataModel: MongoUserDataModel
    ): Promise<void>;
    getMongoBlogTemplateData(): Promise<BlogTemplateMetaDataModel[]>;
    createNewUserData(userId: number): Promise<void>;
}
