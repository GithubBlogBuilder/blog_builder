import {
    MongoUserDataModel,
    jsonToMongoUserDataModel,
} from "@/data/models/MongoUserDataModel";

import clientPromise from "@/lib/mongodb";

export class MongoUserDataSource {
    async getData(userId: number): Promise<MongoUserDataModel> {
        const client = await clientPromise;

        const database = client.db("blog_builder");
        const users = database.collection("user");

        const jsonData = await users.findOne({ userId: userId });
        return jsonToMongoUserDataModel(jsonData);
    }

    async saveData(userId: number, blogRepoName: string): Promise<void> {
        const client = await clientPromise;

        const database = client.db("blog_builder");
        const users = database.collection("user");

        const query = { userId: userId };
        const update = { $set: { blogRepoName: blogRepoName } };
        const options = { upsert: true };
        await users.updateOne(query, update, options);
        return Promise.resolve();
    }
}
