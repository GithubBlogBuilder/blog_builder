'use server';

import { cookies } from 'next/headers';
import { clearAccessToken } from '@/domain/usecases/LoginUseCase';

export async function signOutAction() {
    clearAccessToken(cookies());
}
