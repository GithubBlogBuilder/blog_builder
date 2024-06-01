import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import { MongoUserDataModel } from "@/data/models/MongoUserDataModel";

export interface MongoRepositoryInterface {
    dataSource: MongoUserDataSource;

    getMongoUserData(userId: number): Promise<MongoUserDataModel>;
    saveMongoUserData(userId: number, blogRepoName: string): Promise<void>;
}
