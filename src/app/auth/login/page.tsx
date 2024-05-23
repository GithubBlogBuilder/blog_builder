"use client";

import { Button } from "@/components/ui/button";
import { LuArrowRight, LuGithub } from "react-icons/lu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function AuthPage() {

    return (
        <div className={"w-full flex justify-center items-center"}>
            <Card>
                <CardHeader>
                    <CardTitle className={"text-2xl"}>
                        登入 &nbsp;
                        <span className={"text-primary"}>Blog Builder</span>
                    </CardTitle>
                    <CardDescription>
                        請授權 Github 登入，並開放相關權限以利後續操作
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        className={
                            "w-full flex flex-row space-x-2 bg-purple-800"
                        }
                        variant={"default"}
                        asChild
                    >
                        <Link href="https://github.com/login/oauth/authorize?client_id=Iv23lijthGxIQVLnC65M">
                            <p className={"text-[12px] text-white"}>
                                Github 登入
                            </p>
                            <LuGithub
                                className={"text-foreground text-white"}
                                size={24}
                            />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
