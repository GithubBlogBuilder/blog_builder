import {IUserEntity} from "@/domain/entities/UserEntity";

interface BlogMetaDataRepositoryInterface {
    // need to be implemented in the data layer
    user: IUserEntity,
    metaDataSource: any,

    getBlogMetaData(): Promise<any>
    createNewBlogRepo(): Promise<any>,
}