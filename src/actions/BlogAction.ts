"use server";
import getWebsiteScreenShot from "@/lib/screenShot";
import { getBlogConfigUseCase } from "@/domain/usecases/deploy/deployUseCase";
import { MongoRepositoryImpl } from "@/data/repository/MongoRepositoryImpl";
import { MongoUserDataSource } from "@/data/dataSource/mongo/MongoUserDataSource";

export async function getBlogHomePageScreenShotAction(url: string) {
    return getWebsiteScreenShot(url as string);
}

export async function getBlogConfigDataAction(userId: number) {
    // delay 3s
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return await getBlogConfigUseCase(
        new MongoRepositoryImpl(new MongoUserDataSource()),
        userId
    );
}
