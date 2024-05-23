'use client'
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import { LuGithub } from "react-icons/lu";
import Link from "next/link";
import {UserContext} from "@/components/providers/UserProviders"
import {useContext} from "react";
import {UserAvatar} from "@/components/blocks/UserAvatar"
import {AppLogo} from "@/components/blocks/AppLogo"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {userSignOutAction} from "@/actions/userSignOutAction";
import {useRouter} from "next/navigation"

export function NavigationBar() {

    const userContext = useContext(UserContext)
    const user = userContext.user
    const router = useRouter()

    const onSignOut = () => {
        console.log('sign out')
        userSignOutAction().then(
            () => {
                userContext.setUserContext({
                    ...userContext,
                    user: null,
                })
                router.push('/')
            }
        )
    }

    const loginButton = (
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

    const demoButton = (
        <Button
            className={"flex flex-row space-x-2"}
            variant={"ghost"}
        >
            <p className={"text-[12px]"}> 觀看 Demo </p>
        </Button>
    )


    const userAvatar = (
        user !== null
            ? <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className={"text-destructive"} onClick={onSignOut}>
                        登出
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            : null
    )

    return (
        <div id="navigation bar" className={"h-16 w-full"}>
            <div className={"flex flex-row justify-between items-center py-4"}>
                <AppLogo/>
                <div
                    id="action_list"
                    className={"flex flex-row justify-around space-x-4 items-center"}>
                    {user !== null ? null : demoButton}
                    {user !== null ? userAvatar : loginButton}
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
}
