
import {UserContext} from "@/app/UserProviders"
import {useContext} from "react";
import {IUserEntity} from "@/domain/entities/UserEntity";

export function useUserData() {

    const userContext = useContext(UserContext)

    const userData = userContext.user

    function setUserData(user: IUserEntity) {
        userContext.setUserContext({
            ...userContext,
            user: user
        })
    }

    function clearUserData() {
        userContext.setUserContext({
            ...userContext,
            user: null
        })
    }

    return {
        userData,
        setUserData,
        clearUserData,
    }
}
