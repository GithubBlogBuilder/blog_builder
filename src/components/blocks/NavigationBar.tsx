import {Button} from "@/components/ui/button";
import {ThemeSwitcher} from "@/components/blocks/ThemeSwitcher";
import { LuGithub } from "react-icons/lu";
import Link from "next/link";

export function NavigationBar() {
    return (
        <div id="navigation bar" className={"h-16 w-full"}>
            <div className={"flex flex-row justify-between items-center py-4"}>
                <Link href={'/'}>
                    <div className={"flex flex-row space-x-2 justify-center items-center"}>
                        <div className={"w-8 h-8 rounded-md bg-blue-800 flex flex-col items-center justify-center"}>
                            <p className={"text-white text-lg font-bold"}>B</p>
                        </div>
                        <p className={"text-sm text-primary font-semibold"}>BlogBuilder</p>
                    </div>
                </Link>
                <div id="action_list" className={"flex flex-row justify-around space-x-4 items-center"}>
                    <Button
                        className={"flex flex-row space-x-2"}
                        variant={"ghost"}
                    >
                        <p className={"text-[12px]"}> 觀看 Deom </p>
                    </Button>
                    <Button
                        asChild
                        className={"flex flex-row space-x-2"}
                        variant={"outline"}>
                        <Link href={'/auth/login'}>
                            <p className={"text-[12px]"}>Github 登入</p>
                            <LuGithub size={20}/>
                        </Link>
                    </Button>
                    <ThemeSwitcher/>
                </div>
            </div>
        </div>
    );
}