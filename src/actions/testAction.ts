"use server";
import getWebsiteScreenShot from "@/lib/screenShot";

export async function testAction(url: string) {
    console.log("test action");

    const screenShot = getWebsiteScreenShot(url as string);

    // console.log(screenShot);
    return screenShot;
}
