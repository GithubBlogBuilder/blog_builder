import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GithubUserEntity, UserEntity } from "@/domain/entities/UserEntity";
import { Skeleton } from "@/components/ui/skeleton";

type UserAvatarProps = {
    user: GithubUserEntity;
    isLoading?: boolean;
};

function UserAvatarSkeleton() {
    return (
        <div className={"flex flex-row justify-center items-center gap-2"}>
            <Skeleton className={"w-8 h-8"} />
            <Skeleton className={"w-20 h-8"} />
        </div>
    );
}

export function UserAvatar({ user, isLoading = false }: UserAvatarProps) {
    const isSkeleton = isLoading || !user || user.userId === -1;
    return !isSkeleton ? (
        <div className={"flex flex-row justify-center items-center gap-2"}>
            <Avatar className={"w-8 h-8"}>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.userName}</AvatarFallback>
            </Avatar>
            <p>{user.userName}</p>
        </div>
    ) : (
        <UserAvatarSkeleton />
    );
}
