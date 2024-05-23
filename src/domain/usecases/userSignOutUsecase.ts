
'use server'
import {cookies} from "next/headers"
export async function userSignOutUsecase(){
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0,
    })
}