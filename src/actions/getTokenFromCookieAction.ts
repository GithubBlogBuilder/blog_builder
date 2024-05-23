'use server'

import {cookies} from "next/headers"
export async function getTokenFromCookieAction(){
    const token =  cookies().get('access_token')

    if(token === undefined || token.value === ''){
        return undefined
    }

    // console.log('token', token.value)

    // check token expired
    // const octokit = new Octokit({auth: token.value})
    // try{
    //     const res = await octokit.request('GET /user',{
    //         headers: {
    //             'X-Github-Api-Version': '2022-11-28'
    //         }
    //     })
    //     if(res.status !== 200){
    //         console.log('token expired')
    //         return ''
    //     }
    // }
    // catch (e){
    //     console.log('token expired')
    //     return ''
    // }

    return token.value
}