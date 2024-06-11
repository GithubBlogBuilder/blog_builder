'use server';

import { cookies } from 'next/headers';
import { clearAccessToken } from '@/domain/usecases/LoginUseCase';

export async function signOutAction() {
    const nextCookies = cookies();
    clearAccessToken(nextCookies);
}
