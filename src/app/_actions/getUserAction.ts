'use server'
import {cookies} from "next/headers"
import {getRemoteUserDataUseCase} from "@/domain/usecases/getRemoteUserDataUseCase";

export async function getUserAction(){
    const nextCookies = cookies()

    return await getRemoteUserDataUseCase(nextCookies)
}