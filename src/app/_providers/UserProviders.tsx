'use client';

import React, {
    createContext,
    useEffect,
    useState,
    useTransition,
} from 'react';
import { EmptyUser, UserEntity } from '@/domain/entities/UserEntity';
import { getUserAction } from '@/actions/UserActions';

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
            console.log('UserProvider syncWithRemote');
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
