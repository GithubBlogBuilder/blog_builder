'use client'
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/app/_components/ThemeSwitcher";
import { LuGithub } from "react-icons/lu";
import {UserAvatar} from "@/components/blocks/UserAvatar"
import {AppLogo} from "@/components/blocks/AppLogo"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useUserData} from "@/components/hooks/useUserData";
import React from "react"
import {IUserEntity} from "@/domain/entities/UserEntity";
import { useRouter, usePathname} from 'next/navigation'
import {signOutAction} from "@/app/_actions/signOutAction";

function NavbarTemplate({children}: {children: React.ReactNode}) {
    return (
        <div id="navigation bar" className={"h-16 w-full"}>
            <div className={"flex flex-row justify-between items-center py-4"}>
                <AppLogo/>
                <div
                    id="action_list"
                    className={"flex flex-row justify-around space-x-4 items-center"}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function LoginButton() {
    return (
        <Button
            asChild
            className={"flex flex-row space-x-2"}
            variant={"outline"}
        >
            <Link href={"/auth/login"}>
                <p className={"text-[12px]"}>Github 登入</p>
                <LuGithub size={20} />
            </Link>
        </Button>
    )
}

function DemoButton() {
    return (
        <Button
            className={"flex flex-row space-x-2"}
            variant={"ghost"}
        >
            <p className={"text-[12px]"}> 觀看 Demo </p>
        </Button>
    )
}


function UserAvatarMenu() {
    const {userData, clearUserData} = useUserData()
    const router = useRouter()
    const onSignOut = async () => {
        console.log('sign out')
        clearUserData()
        await signOutAction()
        router.push('/')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={userData ?? {
                    avatarUrl: "",
                    userName: ""
                } as IUserEntity}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"text-destructive"} onClick={onSignOut}>
                    登出
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function NavigationBar() {

    const pathName = usePathname()

    switch (pathName){
        case '/auth/login':
            return (
                <NavbarTemplate>
                    <DemoButton/>
                    <ThemeSwitcher />
                </NavbarTemplate>
            )
        case '/':
            return (
                <NavbarTemplate>
                    <DemoButton/>
                    <LoginButton/>
                    <ThemeSwitcher />
                </NavbarTemplate>
            )

        default:
            return (
                <NavbarTemplate>
                    <UserAvatarMenu/>
                    <ThemeSwitcher />
                </NavbarTemplate>
            )
    }
}
