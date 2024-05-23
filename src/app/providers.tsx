import { ThemeProvider } from "@/components/providers/ThemeProvider";
import React from "react";
import {UserProvider} from "@/components/providers/UserProviders";
import {IUserEntity} from "@/domain/entities/UserEntity";
import {getUserDataAction} from "@/actions/getUserDataAction";

type ThemeProviderProps = {
    children: React.ReactNode;
}

export async function GetUserProvider({children}: Readonly<{children: React.ReactNode}>){

    const user = await getUserDataAction()

    return <UserProvider user={user}>
        {children}
    </UserProvider>
}



export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <GetUserProvider>
                {children}
            </GetUserProvider>
        </ThemeProvider>
    );
}
