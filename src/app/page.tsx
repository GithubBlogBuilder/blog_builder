import { Button } from '@/components/ui/button'
import { LuArrowRight } from 'react-icons/lu'
import { ProfileSVGImage } from '@/components/svg/ProfileSVGImage'
import {
    TbSquareRoundedNumber1Filled,
    TbSquareRoundedNumber2Filled,
    TbSquareRoundedNumber3Filled
} from "react-icons/tb"
import Link from "next/link"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react"
import {IconType} from "react-icons";

function StepCard({Icon, title, description} : {Icon: IconType, title: string, description: string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Icon size={36} className={'text-primary'}/>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

function LandingPageSection({children}: {children: React.ReactNode}) {
    return (
        <div className={'min-h-min p-12 rounded-xl flex flex-row gap-12 shadow-sm'}>
            {children}
        </div>
    )
}

export default function Home() {
    return (
        <div className={'body flex flex-col justify-start'}>
            <LandingPageSection>
                <div className={'flex flex-col justify-center items-start space-y-4'}>
                    <p className={'text-4xl font-semibold text-primary'}>
                        BLOG BUILDER
                    </p>
                    <p className={'text-3xl font-semibold text-foreground'}>
                        零成本快速打造個人部落格
                    </p>
                    <p className={'text-md text-foreground '}>
                        建立部落格可以更簡單，無需設計，無需部署伺服器只需要準備好你精彩的故事即可，現在開始使用 BLOG BUILDER，並連動你的github帳號，建立專屬於你自己的部落格吧。
                    </p>
                    <Button
                        asChild
                        className={"flex flex-row space-x-4"}
                        variant={"default"}>
                        <Link href={'/auth/login'}>
                            建立我的個人部落格
                            <LuArrowRight size={20}/>
                        </Link>
                    </Button>
                </div>
                <div id={'image'} className={'hidden md:flex flex-col justify-center'}>
                    <ProfileSVGImage></ProfileSVGImage>
                </div>
            </LandingPageSection>
            <LandingPageSection>
                <div className={'w-full flex flex-col justify-around items-start space-y-4 py-12'}>
                    <div className={'grid gap-2'}>
                        <p className={'text-3xl font-semibold text-primary'}>
                            三步驟快速部署你的個人部落格
                        </p>
                        <p className={'text-xl font-semibold text-secondary-foreground'}>
                            #挑選樣板 #填寫資訊 #一鍵部署
                        </p>
                    </div>
                    <div className={'w-full grid grid-cols-3 justify-items-stretch gap-8'}>
                        <StepCard
                            Icon={TbSquareRoundedNumber1Filled}
                            title={'# 挑選樣板'}
                            description={'挑選喜歡的部落格樣板模式'}
                        />
                        <StepCard
                            Icon={TbSquareRoundedNumber2Filled}
                            title={'# 填寫資訊'}
                            description={'依照選擇的樣板填寫部落格名稱、介紹、背景圖片、社群等樣式'}
                        />
                        <StepCard
                            Icon={TbSquareRoundedNumber3Filled}
                            title={'# 一鍵部署'}
                            description={'確認資訊後自動建立 Github Repo並自動部署部落格到 Github Page 上'}
                        />
                    </div>
                </div>
            </LandingPageSection>
            <footer className="p-2 text-secondary-foreground text-sm flex flex-col justify-center items-center">
                @powered By BLOG BUILDER
            </footer>
        </div>
    )
}
