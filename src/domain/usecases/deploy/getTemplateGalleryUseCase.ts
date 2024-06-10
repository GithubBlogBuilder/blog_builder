// import { blogTemplateMetaData } from "@/data/models/blogTemplateMetaData";

import { BlogTemplateMetaDataEntity } from '@/domain/entities/BlogTemplateMetaDataEntity';
import { MongoRepositoryImpl } from '@/data/repository/MongoRepositoryImpl';
import { MongoUserDataSource } from '@/data/dataSource/mongo/MongoUserDataSource';

export async function getTemplateGalleryUseCase() {
    const repo = new MongoRepositoryImpl(new MongoUserDataSource());
    const templateData = await repo.getMongoBlogTemplateData();
    return templateData.map((data) => data as BlogTemplateMetaDataEntity);
}
