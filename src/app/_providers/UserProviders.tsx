"use client";

import React, { createContext, useEffect, useState } from "react";
import { UserEntity } from "@/domain/entities/UserEntity";
import { getRemoteUserDataUseCase } from "@/domain/usecases/getRemoteUserDataUseCase";
import { Cookie } from "lucide-react";
import { getUserAction } from "@/app/_actions/getUserAction";

interface ProviderProps {
    children: React.ReactNode;
    user: UserEntity | null;
}

type UserContextProps = {
    user: UserEntity | null;
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
