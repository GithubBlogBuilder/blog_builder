import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";

type ThemeProviderProps = {
    children: React.ReactNode;
};
export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
