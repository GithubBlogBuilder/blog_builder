'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { UserAvatar } from '@/components/blocks/UserAvatar';
import { AppLogo } from '@/components/blocks/AppLogo';
import { useUserData } from '@/components/hooks/useUserData';
import { signOutAction } from '@/actions/LoginActions';
import { LuGithub } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeSwitcher } from '@/app/_components/ThemeSwitcher';

function NavbarTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div className={'h-16 w-full'}>
            <div
                className={
                    'flex fled="navigation bar" clasx-row justify-between items-center py-4'
                }
            >
                <AppLogo />
                <div
                    id="action_list"
                    className={
                        'flex flex-row justify-around space-x-4 items-center'
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    return (
        <Button
            id="login-link"
            asChild
            className={'flex flex-row space-x-2'}
            variant={'outline'}
        >
            <Link href={'/auth/login'}>
                <p className={'text-[12px]'}>Github 登入</p>
                <LuGithub size={20} />
            </Link>
        </Button>
    );
}

function DemoButton() {
    return (
        <Button className={'flex flex-row space-x-2'} variant={'ghost'}>
            <p className={'text-[12px]'}> 觀看 Demo </p>
        </Button>
    );
}

function UserAvatarMenu() {
    const { userData, isSyncWithRemote, clearUserData } = useUserData();
    const router = useRouter();
    const onSignOut = async () => {
        console.log('sign out');
        await signOutAction();
        router.push('/auth/login');
        clearUserData();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger id="action_list">
                <UserAvatar
                    isLoading={isSyncWithRemote}
                    user={userData.githubUser}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    id={'sign-out-button'}
                    className={'text-destructive'}
                    onClick={onSignOut}
                >
                    登出
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function NavigationBar() {
    const pathName = usePathname();

    switch (pathName) {
        case '/auth/login':
            return (
                <NavbarTemplate>
                    <DemoButton />
                    <ThemeSwitcher />
                </NavbarTemplate>
            );
        case '/landing_page':
            return (
                <NavbarTemplate>
                    <DemoButton />
                    <LoginButton />
                    <ThemeSwitcher />
                </NavbarTemplate>
            );

        default:
            return (
                <NavbarTemplate>
                    <UserAvatarMenu />
                    <ThemeSwitcher />
                </NavbarTemplate>
            );
    }
}
