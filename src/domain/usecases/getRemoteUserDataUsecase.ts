"use server"
import {modelToEntity} from "@/domain/entities/UserEntity"
import {getTokenUsecase} from "@/domain/usecases/getTokenUsecase";
import {GithubUserDataSource} from "@/data/dataSource/githubUserDataSource";
import {UserRepositoryImpl} from "@/data/repository/userRepositoryImpl";

export async function getRemoteUserDataUsecase() {
  try {

    const accessToken = await getTokenUsecase()

    if(accessToken === undefined || accessToken?.length === 0){
      console.log('token not found')
      return null
    }

    const userDataSource = new GithubUserDataSource(accessToken)
    const userRepo = new UserRepositoryImpl(userDataSource)
    const userModel = await userRepo.getUser()
    // const res = await getRemoteUserDataUsecase(userRepo)
    return modelToEntity(userModel)
  } catch (error) {
    console.log(error)
    return null
  }
}