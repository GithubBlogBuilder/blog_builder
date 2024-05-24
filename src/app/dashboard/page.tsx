'use client'
import React from "react"
import {useUserData} from "@/components/hooks/useUserData";
import {DashboardOverViewCard} from "@/app/dashboard/DashboardOverViewCard";


export default function AuthPage() {

    const useUser = useUserData()

    return (
        <div className={"w-full h-svh py-4 flex flex-col justify-start items-start gap-4"}>
            <p className={"text-2xl font-bold"}>
                <span className={"text-primary"}>歡迎回來 &nbsp;</span>{useUser.userData?.userName}
            </p>
            <DashboardOverViewCard/>
        </div>
    )
}