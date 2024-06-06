import { UserContext } from "@/app/_providers/UserProviders";
import { useContext } from "react";
import { UserEntity } from "@/domain/entities/UserEntity";

export function useUserData() {
    const userContext = useContext(UserContext);

    const userData = userContext.user;

    function setUserData(user: UserEntity) {
        userContext.setUserContext({
            ...userContext,
            user: user,
        });
    }

    function clearUserData() {
        userContext.setUserContext({
            ...userContext,
            user: null,
        });
    }

    return {
        userData,
        setUserData,
        clearUserData,
    };
}
