"use client";

import React, { createContext, useEffect, useState } from "react";
import { IUserEntity } from "@/domain/entities/UserEntity";
import { getUserAction } from "@/actions/UserActions";

interface ProviderProps {
    children: React.ReactNode;
    user: IUserEntity | null;
}

type UserContextProps = {
    user: IUserEntity | null;
    setUserContext: React.Dispatch<React.SetStateAction<UserContextProps>>;
};

const defaultUserContext: UserContextProps = {
    user: null,
    setUserContext: () => {},
};

export const UserContext = createContext<UserContextProps>({
    ...defaultUserContext,
});

export function UserProvider({ children, user }: ProviderProps) {
    const [userContext, setUserContext] = useState<UserContextProps>({
        ...defaultUserContext,
        user: user,
    });

    useEffect(() => {
        // get user data
        getUserAction().then((user) =>
            setUserContext({
                user: user,
                setUserContext: setUserContext,
            })
        );
    }, []);

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
}
