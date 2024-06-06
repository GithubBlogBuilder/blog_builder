// import { UserContext } from "@/app/_providers/UserProviders";
import { useContext, useEffect, useTransition, useState } from "react";
import { EmptyUser, UserEntity } from "@/domain/entities/UserEntity";
import { getUserAction, updateUserDataAction } from "@/actions/UserActions";

export function useUserData() {
    const [isSyncWithRemote, syncWithRemote] = useTransition();
    const [isSyncWithRemoteUpdate, syncWithRemoteUpdate] = useTransition();
    const [userData, setUserData] = useState<UserEntity>(EmptyUser);

    useEffect(() => {
        syncWithRemote(async () => {
            if (userData.userId === -1) {
                const user = await getUserAction();
                setUserData(user);
            }
        });
    }, []);

    useEffect(() => {
        console.log("useUser: updateUserData", userData);
        if (userData.userId !== -1) {
            syncWithRemoteUpdate(async () => {
                await updateUserDataAction(userData);
            });
        }
    }, [userData]);

    function clearUserData() {
        setUserData(EmptyUser);
    }

    return {
        userData,
        isSyncWithRemote,
        isSyncWithRemoteUpdate,
        setUserData,
        clearUserData,
    };
}
