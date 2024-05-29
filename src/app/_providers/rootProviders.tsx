import { ThemeProvider } from "@/app/_providers/ThemeProvider";
import React from "react";
import {UserProvider} from "@/app/_providers/UserProviders";
import {getRemoteUserDataUseCase} from "@/domain/usecases/getRemoteUserDataUseCase";
import {cookies} from "next/headers";

export async function RootProviders({ children, ...props }: {children: React.ReactNode}) {
    const nextCookies = cookies()
    const user = await getRemoteUserDataUseCase(nextCookies)
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UserProvider user={null}>
                {children}
            </UserProvider>
        </ThemeProvider>
    );
}
