import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_TC } from "next/font/google";
import { cn } from "@/lib/utils";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { RootProviders } from "@/app/_providers/RootProviders";
import React from "react";
import { UserContext } from "@/app/_providers/UserProviders";
import { EmptyUser } from "@/domain/entities/UserEntity";
const fontSans = Noto_Sans_TC({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Github Blog Builder",
    description: "A blog builder that uses Github as a CMS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <RootProviders>
                    <div
                        aria-label={"layout"}
                        className="flex flex-col min-h-screen w-full justify-center items-center"
                    >
                        <div
                            aria-label={"layout"}
                            className="flex flex-col justify-center min-h-screen w-2/3"
                        >
                            <header className="sticky">
                                <NavigationBar />
                            </header>
                            <main className="flex-grow flex flex-col justify-center">
                                {children}
                            </main>
                        </div>
                    </div>
                </RootProviders>
            </body>
        </html>
    );
}
