import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Noto_Sans_TC } from 'next/font/google'
import { cn } from '@/lib/utils'
import { NavigationBar } from '@/app/_components/NavigationBar'
import { RootProviders } from '@/app/_providers/rootProviders'
import React from 'react'
const fontSans = Noto_Sans_TC({
    subsets: ['latin'],
    variable: '--font-sans',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Github Blog Builder',
    description: 'A blog builder that uses Github as a CMS',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html suppressHydrationWarning={true} lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <RootProviders>
                    <div
                        aria-label={'layout'}
                        className="px-12 md:px-24 lg:px-48 flex flex-col min-h-screen w-full"
                    >
                        <header className="sticky">
                            <NavigationBar />
                        </header>
                        <main className="flex-grow flex flex-col justify-center">
                            {children}
                        </main>
                    </div>
                </RootProviders>
            </body>
        </html>
    )
}
