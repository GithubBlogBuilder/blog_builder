"use client";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { LuLink, LuGitBranch, LuTimer } from "react-icons/lu";
import { useState } from "react";
import { getBlogHomePageScreenShotAction } from "@/actions/BlogAction";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusChip } from "@/components/blocks/blog/StatusChip";

function InfoField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className={"flex flex-col items-start space-y-1"}>
            <Label className={"text-primary"}>{label}</Label>
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
        const screenShot = getBlogHomePageScreenShotAction(url).then(
            (image) => {
                setScreenShot(`data:image/png;base64,${image}`);
                setImageSuspend(false);
            }
        );
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
                    className={"absolute rounded-xl object-cover object-top"}
                    priority={true}
                />
            ) : (
                <Skeleton className="animate-pulse w-full h-full p-4 rounded-xl" />
            )}
        </div>
    );
}

function TextDataDisplay({
    value,
    href = "",
    decoration = null,
}: {
    value: string;
    href?: string;
    decoration?: React.ReactNode;
}) {
    const body = (
        <div
            className={
                "flex flex-row justify-start items-center space-x-2 text-sm"
            }
        >
            {decoration}
            <p className={"font-semibold"}>{value}</p>
        </div>
    );

    if (href.length > 0) {
        return (
            <Link href={href} target={"_blank"} className={"underline"}>
                {body}
            </Link>
        );
    }
    return body;
}

export function DashboardOverViewCard() {
    const blogDeployInfo: BlogDeployInfo = {
        blogTitle: "Quan 的小小小空間",
        status: "運行中",
        lastTimeUpdated: "2021-10-10 10:10:10",
        blogDeployLink: "https://github-blog-lab.vercel.app",
        githubRepoLink: "quan0715/blog-builder",
    };

    const fieldMapper = [
        {
            label: "部落格名稱",
            value: <TextDataDisplay value={blogDeployInfo.blogTitle} />,
        },
        {
            label: "部署狀態",
            value: <StatusChip state={"completed"} label={"運行中"} />,
        },
        {
            label: "最後更新時間",
            value: <TextDataDisplay value={blogDeployInfo.lastTimeUpdated} />,
        },
        {
            label: "部署連結",
            value: (
                <TextDataDisplay
                    value={blogDeployInfo.blogDeployLink ?? ""}
                    href={blogDeployInfo.blogDeployLink}
                    decoration={<LuLink />}
                />
            ),
        },
        {
            label: "Github 連結",
            value: (
                <TextDataDisplay
                    value={blogDeployInfo.githubRepoLink ?? ""}
                    href={blogDeployInfo.githubRepoLink}
                    decoration={<LuGitBranch />}
                />
            ),
        },
    ];

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
                    {fieldMapper.map((field) => (
                        <InfoField key={field.label} label={field.label}>
                            {field.value}
                        </InfoField>
                    ))}
                </div>
            </div>
        </Card>
    );
}
