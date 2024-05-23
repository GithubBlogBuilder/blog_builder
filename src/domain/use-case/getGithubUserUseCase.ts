import {UserRepositoryInterface} from "@/domain/repository/userRepositoryInterface";
import {modelToEntity} from "@/domain/entities/UserEntity"

export async function getGithubUserUseCase(githubUserRepository: UserRepositoryInterface) {
  try {
    const userModel = await githubUserRepository.getUser()
    return modelToEntity(userModel)
  } catch (error) {
    console.log(error)
    return null
  }
}