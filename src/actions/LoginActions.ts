"use server";

import { cookies } from "next/headers";
import { signOut } from "@/domain/usecases/auth/LoginUseCase";

export async function signOutAction() {
    signOut(cookies());
}
