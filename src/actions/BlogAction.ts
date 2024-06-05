"use server";
import getWebsiteScreenShot from "@/lib/screenShot";

export async function getBlogHomePageScreenShotAction(url: string) {
    return getWebsiteScreenShot(url as string);
}
