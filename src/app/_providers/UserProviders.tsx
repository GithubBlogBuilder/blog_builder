"use client";

import React, {
    createContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    useTransition,
} from "react";
import { EmptyUser, UserEntity } from "@/domain/entities/UserEntity";
import { DeployEntity } from "@/app/deploy/_provider/DeployProvider";
import { getUserAction } from "@/actions/UserActions";

// type UserContextProps = {
//     user: UserEntity;
//     setUserContext: Dispatch<SetStateAction<UserContextProps>>;
// };

// const defaultUserContext: UserContextProps = {
//     userData: EmptyUser,
//     setUserContext: () => {},
// };

export const UserContext = createContext({
    userData: EmptyUser,
    setUserData: (userData: UserEntity) => {},
    isSyncWithRemote: false,
});

export function UserProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userData, setUserData] = useState<UserEntity>(EmptyUser);

    const [isSyncWithRemote, syncWithRemote] = useTransition();

    useEffect(() => {
        syncWithRemote(async () => {
            const user = await getUserAction();
            setUserData(user);
        });
    }, []);

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                isSyncWithRemote,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
