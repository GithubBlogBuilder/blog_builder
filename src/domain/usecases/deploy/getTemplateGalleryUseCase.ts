// import { blogTemplateMetaData } from "@/data/models/blogTemplateMetaData";

import { BlogTemplateMetaDataEntity } from "@/domain/entities/BlogTemplateMetaDataEntity";
import { MongoRepositoryImpl } from "@/data/repository/MongoRepositoryImpl";
import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";
import { createNewUserData } from "@/domain/usecases/UserUseCase";

export async function getTemplateGalleryUseCase() {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    const templateData = await repo.getMongoBlogTemplateData();
    // console.log("templateData", templateData);
    return templateData.map((data) => data as BlogTemplateMetaDataEntity);
}
