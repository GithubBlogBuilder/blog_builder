import {
    MongoUserDataModel,
    jsonToMongoUserDataModel,
} from "@/data/models/MongoUserDataModel";

import clientPromise from "@/lib/mongodb";
import {
    BlogTemplateMetaDataModel,
    jsonToBlogTemplateMetaDataModel,
} from "@/data/models/BlogTemplateDataModel";

export class MongoUserDataSource {
    async getData(userId: number): Promise<MongoUserDataModel | undefined> {
        const client = await clientPromise;

        const database = client.db("blog_builder");
        const users = database.collection("user");

        const jsonData = await users.findOne({ userId: userId });

        if (!jsonData) {
            console.log(
                "MongoUserDataSource: No user data found, You should create a user first."
            );
            return undefined;
        }

        return jsonToMongoUserDataModel(jsonData);
    }

    async insertData(data: MongoUserDataModel): Promise<void> {
        const client = await clientPromise;

        const database = client.db("blog_builder");
        const users = database.collection("user");

        const res = await users.insertOne(data);
        console.log("MongoUserDataSource: Inserted data", res);
    }

    async saveData(userId: number, data: MongoUserDataModel): Promise<void> {
        console.log("MongoUserDataSource: Saving data", data);
        const client = await clientPromise;

        const database = client.db("blog_builder");
        const users = database.collection("user");

        const query = { userId: userId };
        const update = {
            $set: {
                blogRepoName: data.blogRepoName,
                blogConfig: data.blogConfig,
            },
        };
        const options = { upsert: true };
        const res = await users.updateOne(query, update, options);

        return Promise.resolve();
    }

    async getBlogTemplateData(): Promise<BlogTemplateMetaDataModel[]> {
        const client = await clientPromise;
        const database = client.db("blog_builder");
        const blogTemplates = database.collection("blog_template_data");

        const arrayData = await blogTemplates.find({}).toArray();

        // console.log(arrayData);

        return arrayData.map((template) =>
            jsonToBlogTemplateMetaDataModel(template)
        );
    }
}
