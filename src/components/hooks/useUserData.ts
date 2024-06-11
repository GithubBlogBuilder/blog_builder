// import { UserContext } from "@/app/_providers/UserProviders";
import { useContext, useTransition } from 'react';
import { EmptyUser, UserEntity } from '@/domain/entities/UserEntity';
import { getUserAction, updateUserDataAction } from '@/actions/UserActions';
import { UserContext } from '@/app/_providers/UserProviders';

export function useUserData() {
    const [isSyncWithRemoteUpdate, syncWithRemoteUpdate] = useTransition();

    const userDataContext = useContext(UserContext);

    const userData = userDataContext.userData;
    const isSyncWithRemote = userDataContext.isSyncWithRemote;

    function clearUserData() {
        userDataContext.setUserData(EmptyUser);
    }

    function saveUserData(userData: UserEntity) {
        if (userDataContext.userData.userId !== -1) {
            syncWithRemoteUpdate(async () => {
                console.log('useUserData: 資料更新', userData);
                userDataContext.setUserData(userData);
                await updateUserDataAction(userData);
            });
        }
    }

    async function syncUserData() {
        syncWithRemoteUpdate(async () => {
            const user = await getUserAction();
            userDataContext.setUserData(user);
        });
    }

    return {
        userData,
        isSyncWithRemote,
        isSyncWithRemoteUpdate,
        syncUserData,
        clearUserData,
        setUserData: saveUserData,
    };
}
