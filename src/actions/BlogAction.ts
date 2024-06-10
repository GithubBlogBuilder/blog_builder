'use server';
import getWebsiteScreenShot from '@/lib/screenShot';
import { getTemplateGalleryUseCase } from '@/domain/usecases/deploy/getTemplateGalleryUseCase';
import { UserEntity } from '@/domain/entities/UserEntity';
import { deployUseCase } from '@/domain/usecases/deploy/deployUseCase';
import { cookies } from 'next/headers';

export async function getBlogHomePageScreenShotAction(url: string) {
    return getWebsiteScreenShot(url as string);
}

export async function getTemplateGalleryAction() {
    return await getTemplateGalleryUseCase();
}

export async function startDeployAction(userData: UserEntity) {
    const nextCookie = cookies();
    return await deployUseCase(nextCookie, userData);
}
