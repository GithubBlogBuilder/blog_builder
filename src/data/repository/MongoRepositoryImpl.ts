import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import { MongoRepositoryInterface } from "@/domain/repository/MongoRepositoryInterface";
import { MongoUserDataModel } from "../models/MongoUserDataModel";

export class MongoRepositoryImpl implements MongoRepositoryInterface {
    dataSource: MongoUserDataSource;

    constructor(dataSource: MongoUserDataSource) {
        this.dataSource = dataSource;
    }

    getMongoUserData(userId: number): Promise<MongoUserDataModel> {
        return this.dataSource.getData(userId);
    }

    saveMongoUserData(userId: number, blogRepoName: string): Promise<void> {
        return this.dataSource.saveData(userId, blogRepoName);
    }
}
