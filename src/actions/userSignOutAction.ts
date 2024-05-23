'use server'
import {cookies} from "next/headers"
export async function userSignOutAction(){
    // clear login token
    console.log('clear token')
    cookies().set('access_token', '', {
        maxAge: 0,
    })
}