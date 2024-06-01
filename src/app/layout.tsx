import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Noto_Sans_TC } from "next/font/google";
import { cn } from "@/lib/utils";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { RootProviders } from "@/app/_providers/rootProviders";
import React from "react";
const fontSans = Noto_Sans_TC({
    subsets: ["latin"],
    variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

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
                        className={
                            "flex flex-col w-screen h-auto justify-center items-center p-4"
                        }
                    >
                        <div
                            aria-label={"layout"}
                            className="p-4 flex flex-col justify-center min-h-screen w-full min-w-screen-sm max-w-screen-sm md:max-w-screen-xl"
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
