import Image from "next/image";
import {Button} from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu"
import {ProfileSVGImage} from "@/components/svg/ProfileSVGImage";
import {
    TbSquareRoundedNumber1Filled,
    TbSquareRoundedNumber2Filled,
    TbSquareRoundedNumber3Filled
} from "react-icons/tb"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"




export default function Home() {
    return (
        <div className={"body overflow-scroll flex flex-col justify-start"}>
            <div className={"body min-h-screen p-12 rounded-xl flex flex-row gap-12 shadow-sm"}>
                <div className={"flex flex-col justify-center items-start space-y-4"}>
                    <p className={"text-4xl font-semibold text-primary"}>BLOG BUILDER</p>
                    <p className={"text-3xl font-semibold text-foreground"}>零成本快速打造個人部落格</p>
                    <p className={"text-md text-foreground "}>建立部落格可以更簡單，無需設計，無需部署伺服器只需要準備好你精彩的故事即可，現在開始使用
                        BLOG
                        BUILDER，並連動你的github帳號，建立專屬於你自己的部落格吧。</p>
                    <Button
                        className={"flex flex-row space-x-4"}
                        variant={"default"}>
                        建立我的個人部落格
                        <LuArrowRight size={20}/>
                    </Button>
                </div>
                <div id={"image"} className={"hidden md:flex flex-col justify-center"}>
                    <ProfileSVGImage></ProfileSVGImage>
                </div>
            </div>
            <div className={"body min-h-screen bg-primary p-12 flex flex-row gap-12 shadow-sm"}>
                <div className={"w-full flex flex-col justify-center items-start space-y-4"}>
                    <p className={"text-3xl font-semibold text-primary-foreground"}>三步驟快速部署你的個人部落格</p>
                    <p className={"text-2xl font-semibold text-secondary-foreground"}>#挑選樣板 #填寫資訊 #一鍵部署</p>
                    <div className={"w-full grid grid-cols-3 justify-items-stretch gap-8"}>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <TbSquareRoundedNumber1Filled size={36} className={"text-primary"}/>
                                    # 挑選樣板
                                </CardTitle>
                                <CardDescription>挑選喜歡的部落格樣板模式</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <TbSquareRoundedNumber2Filled size={36} className={"text-primary"}/>
                                    # 填寫資訊
                                </CardTitle>
                                <CardDescription>依照選擇的樣板填寫部落格名稱、介紹、背景圖片、社群等樣式</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <TbSquareRoundedNumber3Filled size={36} className={"text-primary"}/>
                                    # 一鍵部署
                                </CardTitle>
                                <CardDescription>確認資訊後自動建立 Github Repo並自動部署部落格到 Github Page
                                    上</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            {/*<div className={"min-h-screen p-12 flex flex-row gap-12 shadow-sm"}>*/}
            {/*    <div className={"w-full flex flex-col justify-center items-start space-y-4"}>*/}
            {/*        <p className={"text-3xl font-semibold text-primary"}>GITHUB CRM </p>*/}
            {/*        <p className={"text-2xl font-semibold text-secondary-foreground"}>文章 / 留言 / 環境變數 你想到的都在 Github</p>*/}
            {/*        <div className={"w-full grid grid-cols-3 justify-items-stretch gap-8"}>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <footer className="p-2 text-secondary-foreground text-sm flex flex-col justify-center items-center">
                @power By BLOG BUILDER
            </footer>
        </div>
    );
}
