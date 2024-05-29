
import Image from "next/image"
import React from "react"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import Link from "next/link";
import {
    LuLink, LuGitBranch, LuTimer
} from 'react-icons/lu'
function LabelChip({label} : {label: string} ){
    return (
        <div className={"rounded-sm bg-primary/5 p-1 font-semibold text-primary text-sm"}>
            {label}
        </div>
    )
}

function InfoField({label, children} : {label: string, children: React.ReactNode}){
    return (
        <div className={"flex flex-col items-start space-y-2"}>
            <LabelChip label={label}/>
            {children}
        </div>
    )
}

type BlogDeployInfo = {
    blogTitle: string,
    status: "運行中" | "異常" | "部署中",
    blogDeployLink?: string,
    githubRepoLink?: string,
    lastTimeUpdated: string,
}

export function DashboardOverViewCard() {
    const blogDeployInfo: BlogDeployInfo = {
        blogTitle: "Quan 的小小小空間",
        status: "運行中",
        lastTimeUpdated: (new Date()).toLocaleString(),
        blogDeployLink: "https://www.google.com",
        githubRepoLink: "quan0715/blog-builder"
    }
    return (
        <Card className={"w-full"}>
            <div className={"flex flex-row p-6 items-stretch"}>
                <div id={"screen-shot"} className={"flex-grow flex bg-black/10 overflow-hidden rounded-xl shadow-sm items-center justify-center"}>
                    {/*<Image*/}
                    {/*    src={"/template_image1.png"}*/}
                    {/*    alt={"screen-shot"}*/}
                    {/*    width={500}*/}
                    {/*    height={300}*/}
                    {/*/>*/}
                    <p> 部署頁面截圖</p>
                </div>
                <div className={"flex-grow flex flex-col pl-4 justify-center items-start space-y-4"}>
                    <InfoField label={"部落格名稱"}>
                        <p className={"text-md font-semibold"}>{blogDeployInfo.blogTitle}</p>
                    </InfoField>
                    <InfoField label={"部署狀態"}>
                        <div className={"flex flex-row justify-start items-center bg-green-500/10 px-4 py-1 rounded-md"}>
                            <div className={"w-2 h-2 bg-green-500 rounded-full"}> </div>
                            <p className={"pl-2 text-md font-bold text-green-500"}>{blogDeployInfo.status}</p>
                        </div>
                    </InfoField>
                    <InfoField label={"最後更新時間"}>
                        <p className={"text-md font-semibold"}>{blogDeployInfo.lastTimeUpdated}</p>
                    </InfoField>
                    <InfoField label={"部署連結"}>
                        <div className={"flex flex-row justify-start items-center space-x-2"}>
                            <LuLink />
                            <Link href={""} target={"_blank"} className={"underline"}>
                                <p className={"font-semibold"}>{blogDeployInfo.blogDeployLink}</p>
                            </Link>
                        </div>
                    </InfoField>
                    <InfoField label={"Github 連結"}>
                        <div className={"flex flex-row justify-start items-center space-x-2"}>
                            <LuGitBranch/>
                            <Link href={""} target={"_blank"} >
                                <p className={"font-semibold"}>{blogDeployInfo.githubRepoLink}</p>
                            </Link>
                        </div>
                    </InfoField>

                </div>
            </div>
        </Card>
    );
}