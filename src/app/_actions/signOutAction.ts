'use server'
// framework base action
import {cookies} from "next/headers"
import {userSignOutUseCase} from "@/domain/usecases/auth/userSignOutUseCase";

export async function signOutAction(){
    userSignOutUseCase(
        cookies()
    )
}