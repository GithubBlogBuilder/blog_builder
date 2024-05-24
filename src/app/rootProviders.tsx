import { ThemeProvider } from "@/app/ThemeProvider";
import React from "react";
import {UserProvider} from "@/app/UserProviders";
import {getRemoteUserDataUsecase} from "@/domain/usecases/getRemoteUserDataUsecase";


export async function RootProviders({ children, ...props }: {children: React.ReactNode}) {
    const user = await getRemoteUserDataUsecase()
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UserProvider user={user}>
                {children}
            </UserProvider>
        </ThemeProvider>
    );
}
