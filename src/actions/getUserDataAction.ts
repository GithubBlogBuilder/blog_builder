'use server'
import { getTokenFromCookieAction } from '@/actions/getTokenFromCookieAction'
import {GithubUserDataSource} from "@/data/dataSource/githubUserDataSource";
import {UserRepositoryImpl} from "@/data/repository/userRepositoryImpl";
import {getGithubUserUseCase} from "@/domain/use-case/getGithubUserUseCase";
export async function getUserDataAction(){
    const accessToken = await getTokenFromCookieAction()

    if(accessToken === undefined || accessToken?.length === 0){
        console.log('token not found')
        return null
    }

    const userDataSource = new GithubUserDataSource(accessToken)
    const userRepo = new UserRepositoryImpl(userDataSource)

    return await getGithubUserUseCase(userRepo)
}