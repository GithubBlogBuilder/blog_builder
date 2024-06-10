'use server';
import getWebsiteScreenShot from '@/lib/screenShot';
import { getTemplateGalleryUseCase } from '@/domain/usecases/deploy/getTemplateGalleryUseCase';
import { UserEntity } from '@/domain/entities/UserEntity';
import {
    archiveRepoUseCase,
    deployUseCase,
} from '@/domain/usecases/deploy/deployUseCase';
import { cookies } from 'next/headers';

const nextCookie = cookies();

export async function getBlogHomePageScreenShotAction(url: string) {
    return getWebsiteScreenShot(url as string);
}

export async function getTemplateGalleryAction() {
    return await getTemplateGalleryUseCase();
}

export async function startDeployAction(userData: UserEntity) {
    return await deployUseCase(nextCookie, userData);
}

export async function deleteDeployAction(userData: UserEntity) {
    const nextCookie = cookies();

    return await archiveRepoUseCase(nextCookie, userData);
}
