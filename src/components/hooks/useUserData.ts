// import { UserContext } from "@/app/_providers/UserProviders";
import { useContext, useTransition } from 'react';
import { EmptyUser, UserEntity } from '@/domain/entities/UserEntity';
import { getUserAction, updateUserDataAction } from '@/actions/UserActions';
import { UserContext } from '@/app/_providers/UserProviders';

export function useUserData() {
    // const [isSyncWithRemote, syncWithRemote] = useTransition();
    const [isSyncWithRemoteUpdate, syncWithRemoteUpdate] = useTransition();
    // const [userData, setUserData] = useState<UserEntity>(EmptyUser);

    const userDataContext = useContext(UserContext);

    const userData = userDataContext.userData;
    const isSyncWithRemote = userDataContext.isSyncWithRemote;

    // const setUserData = userDataContext.setUserData;
    // FIXED BUG: render twice

    // useEffect(() => {
    //     console.log('useUser: getUserData');
    //     syncWithRemoteUpdate(async () => {
    //         await updateUserDataAction(userDataContext.userData);
    //     });
    // }, []);

    // useEffect(() => {
    //     // console.log("useUser: updateUserData", userData);
    //     updateUserData(userDataContext.userData);
    // }, [userDataContext]);

    function clearUserData() {
        userDataContext.setUserData(EmptyUser);
    }

    function setUserData(userData: UserEntity) {
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
        setUserData,
    };
}
