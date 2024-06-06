"use server";

import { cookies } from "next/headers";
import { signOut } from "@/domain/usecases/LoginUseCase";

export async function signOutAction() {
    signOut(cookies());
}
