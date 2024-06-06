import { GithubUserModel } from "@/data/models/GithubUserModel";

export interface UserEntity {
    userName: string;
    userId: number;
    avatarUrl: string;
}

export function userModelToEntity(data: GithubUserModel): UserEntity {
    return {
        userName: data.login,
        userId: data.id,
        avatarUrl: data.avatarUrl,
    };
}
// export class UserEntity implements IUserEntity{
//     userName: string
//     userId: number
//     avatarUrl: string
//
//     constructor(data: IUserEntity){
//         this.userName = data.userName
//         this.userId = data.userId
//         this.avatarUrl = data.avatarUrl
//     }
// }
