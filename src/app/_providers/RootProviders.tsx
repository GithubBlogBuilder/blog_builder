import { ThemeProvider } from '@/app/_providers/ThemeProvider';
import React from 'react';
import { UserProvider } from '@/app/_providers/UserProviders';
// import { UserProvider } from "@/app/_providers/UserProviders";

export async function RootProviders({
    children,
    ...props
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <UserProvider>{children}</UserProvider>
        </ThemeProvider>
    );
}
