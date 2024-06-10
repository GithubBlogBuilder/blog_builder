import {
    MongoUserDataModel,
    jsonToMongoUserDataModel,
} from '@/data/models/MongoUserDataModel';

import clientPromise from '@/lib/mongodb';
import {
    BlogTemplateMetaDataModel,
    jsonToBlogTemplateMetaDataModel,
} from '@/data/models/BlogTemplateDataModel';

export class MongoUserDataSource {
    async getData(userId: number): Promise<MongoUserDataModel> {
        console.log('MongoUserDataSource: fetching data for user', userId);
        const client = await clientPromise;

        const database = client.db('blog_builder');
        const users = database.collection('user');

        const jsonData = await users.findOne({ userId: userId });

        if (!jsonData) {
            console.error(
                'MongoUserDataSource: no data found for user',
                userId
            );
            return Promise.reject('no data found');
        }

        console.log('MongoUserDataSource: got data', jsonData);
        return jsonToMongoUserDataModel(jsonData);
    }

    async insertData(data: MongoUserDataModel): Promise<void> {
        const client = await clientPromise;

        const database = client.db('blog_builder');
        const users = database.collection('user');

        const result = await users.insertOne(data);
        if (!result.acknowledged) {
            console.error('MongoUserDataSource: insert failed');
            return;
        }
        console.log('MongoUserDataSource: inserted data for user', data.userId);
        return Promise.resolve();
    }

    async saveData(userId: number, data: MongoUserDataModel): Promise<void> {
        const client = await clientPromise;

        const database = client.db('blog_builder');
        const users = database.collection('user');

        const query = { userId: userId };
        const update = {
            $set: {
                blogRepoName: data.blogRepoName,
                blogConfig: data.blogConfig,
            },
        };
        const options = { upsert: true };
        const result = await users.updateOne(query, update, options);
        if (!result.acknowledged) {
            console.error('MongoUserDataSource: update failed');
            return;
        }
        console.log('MongoUserDataSource: saved data for user', data.userId);
        return Promise.resolve();
    }

    async deleteData(userId: number): Promise<void> {
        const client = await clientPromise;

        const database = client.db('blog_builder');
        const users = database.collection('user');

        const result = await users.deleteOne({ userId: userId });
        if (!result.acknowledged) {
            console.error('MongoUserDataSource: delete failed');
            return;
        }
        console.log('MongoUserDataSource: deleted data for user', userId);
        return Promise.resolve();
    }

    async getBlogTemplateData(): Promise<BlogTemplateMetaDataModel[]> {
        const client = await clientPromise;
        const database = client.db('blog_builder');
        const blogTemplates = database.collection('blog_template_data');

        const arrayData = await blogTemplates.find({}).toArray();
        return arrayData.map((template) =>
            jsonToBlogTemplateMetaDataModel(template)
        );
    }
}
