import React from "react";
import { useUserData } from "@/components/hooks/useUserData";
import { DashboardOverViewCard } from "@/app/dashboard/_components/DashboardOverViewCard";
import { BlogPostCardListView } from "@/app/dashboard/_components/BlogPostCardListView";
import { SectionHeader } from "@/app/dashboard/_components/SectionHeader";

export default function Dashboard() {
    // const useUser = useUserData();

    return (
        <div
            className={
                "w-full h-svh py-4 flex flex-col justify-start items-start gap-4"
            }
        >
            {/*<p className={"text-2xl font-bold"}>*/}
            {/*    <span className={"text-primary"}>歡迎回來 &nbsp;</span>*/}
            {/*    {useUser.userData?.userName}*/}
            {/*</p>*/}
            <SectionHeader
                title={"Blog Dashboard 部落格狀態管理"}
                description={"檢視你的部落格部署狀態"}
            />
            <DashboardOverViewCard />
            <SectionHeader
                title={"Post Management 貼文管理"}
                description={"檢視/新增/編輯你的貼文，點擊貼文進入編輯頁面"}
            />
            <BlogPostCardListView />
        </div>
    );
}
