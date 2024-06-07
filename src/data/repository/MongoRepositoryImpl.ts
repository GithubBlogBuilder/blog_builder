import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import { MongoRepositoryInterface } from "@/domain/repository/MongoRepositoryInterface";
import {
    emptyMongoUserDataModel,
    MongoUserDataModel,
} from "../models/MongoUserDataModel";
import { BlogTemplateMetaDataModel } from "../models/BlogTemplateDataModel";

export class MongoRepositoryImpl implements MongoRepositoryInterface {
    dataSource: MongoUserDataSource;

    constructor(dataSource: MongoUserDataSource) {
        this.dataSource = dataSource;
    }

    getMongoBlogTemplateData(): Promise<BlogTemplateMetaDataModel[]> {
        return this.dataSource.getBlogTemplateData();
    }

    getMongoUserData(userId: number): Promise<MongoUserDataModel | undefined> {
        return this.dataSource.getData(userId);
    }

    saveMongoUserData(
        userId: number,
        userData: MongoUserDataModel
    ): Promise<void> {
        return this.dataSource.saveData(userId, userData);
    }

    createNewUserData(userId: number): Promise<void> {
        const newData: MongoUserDataModel = {
            ...emptyMongoUserDataModel,
            userId: userId,
        };
        return this.dataSource.insertData(newData);
    }
}
