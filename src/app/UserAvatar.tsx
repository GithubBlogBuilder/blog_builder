import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {IUserEntity} from "@/domain/entities/UserEntity";

type UserAvatarProps = {
    user: IUserEntity
}

export function UserAvatar({user}: UserAvatarProps) {
    return (
        <div className={"flex flex-row justify-center items-center gap-2"}>
            <Avatar className={"w-8 h-8"}>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.userName}</AvatarFallback>
            </Avatar>
            <p>
                {user.userName}
            </p>
        </div>
    );
}