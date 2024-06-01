"use client";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { LuLink, LuGitBranch, LuTimer } from "react-icons/lu";
import { SectionHeader } from "@/app/dashboard/_components/SectionHeader";
import { useState } from "react";
import getWebsiteScreenShot from "@/lib/screenShot";
import { testAction } from "@/actions/testAction";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

function LabelChip({ label }: { label: string }) {
    return (
        <div className={"rounded-sm font-semibold text-primary text-sm"}>
            {label}
        </div>
    );
}

function InfoField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className={"flex flex-col items-start space-y-1"}>
            <LabelChip label={label} />
            {children}
        </div>
    );
}

type BlogDeployInfo = {
    blogTitle: string;
    status: "運行中" | "異常" | "部署中";
    blogDeployLink?: string;
    githubRepoLink?: string;
    lastTimeUpdated: string;
};

function WebsiteScreenShot({ url }: { url: string }) {
    const [screenShot, setScreenShot] = useState<string>("");
    const [imageSuspend, setImageSuspend] = useState<boolean>(true);

    useEffect(() => {
        const screenShot = testAction(url).then((image) => {
            setScreenShot(`data:image/png;base64,${image}`);
            setImageSuspend(false);
        });
    }, []);

    return (
        <div
            id={"screen-shot"}
            className={
                "relative overflow-clip h-[320px] md:w-[444px] md:h-full border-2 rounded-xl shadow-sm items-center justify-center"
            }
        >
            {!imageSuspend ? (
                <Image
                    src={screenShot}
                    alt={"部署頁面截圖"}
                    layout={"fill"}
                    className={"absolute rounded-xl object-contain "}
                    priority={true}
                />
            ) : (
                <Skeleton className="animate-pulse w-full p-4 rounded-xl" />
            )}
        </div>
    );
}

export function DashboardOverViewCard() {
    const blogDeployInfo: BlogDeployInfo = {
        blogTitle: "Quan 的小小小空間",
        status: "運行中",
        lastTimeUpdated: "2021-10-10 10:10:10",
        blogDeployLink: "https://ui.shadcn.com/",
        githubRepoLink: "quan0715/blog-builder",
    };

    return (
        <Card className={"w-full flex flex-col"}>
            <div
                className={
                    "flex flex-col p-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0"
                }
            >
                <WebsiteScreenShot
                    url={blogDeployInfo.blogDeployLink as string}
                />
                <div
                    className={
                        "flex-grow flex flex-col justify-center items-start space-y-4"
                    }
                >
                    <InfoField label={"部落格名稱"}>
                        <p className={"text-md font-semibold text-sm"}>
                            {blogDeployInfo.blogTitle}
                        </p>
                    </InfoField>
                    <InfoField label={"部署狀態"}>
                        <div
                            className={
                                "flex flex-row justify-start items-center bg-green-500/10 px-4 py-1 rounded-md"
                            }
                        >
                            <div
                                className={"w-2 h-2 bg-green-500 rounded-full"}
                            >
                                {" "}
                            </div>
                            <p
                                className={
                                    "pl-2 text-md font-bold text-sm text-green-500"
                                }
                            >
                                {blogDeployInfo.status}
                            </p>
                        </div>
                    </InfoField>
                    <InfoField label={"最後更新時間"}>
                        <p className={"text-sm font-semibold"}>
                            {blogDeployInfo.lastTimeUpdated}
                        </p>
                    </InfoField>
                    <InfoField label={"部署連結"}>
                        <div
                            className={
                                "flex flex-row justify-start items-center space-x-2 text-sm"
                            }
                        >
                            <LuLink />
                            <Link
                                href={""}
                                target={"_blank"}
                                className={"underline"}
                            >
                                <p className={"font-semibold"}>
                                    {blogDeployInfo.blogDeployLink}
                                </p>
                            </Link>
                        </div>
                    </InfoField>
                    <InfoField label={"Github 連結"}>
                        <div
                            className={
                                "flex flex-row justify-start items-center space-x-2"
                            }
                        >
                            <LuGitBranch />
                            <Link href={""} target={"_blank"}>
                                <p className={"font-semibold text-sm"}>
                                    {blogDeployInfo.githubRepoLink}
                                </p>
                            </Link>
                        </div>
                    </InfoField>
                </div>
            </div>
        </Card>
    );
}
