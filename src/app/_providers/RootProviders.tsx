import { ThemeProvider } from "@/app/_providers/ThemeProvider";
import React from "react";
import { UserProvider } from "@/app/_providers/UserProviders";
import { cookies } from "next/headers";
import { getGitHubUserData } from "@/domain/usecases/UserUseCase";

export async function RootProviders({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    const nextCookies = cookies();
    const user = await getGitHubUserData(nextCookies);
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UserProvider user={null}>{children}</UserProvider>
        </ThemeProvider>
    );
}
