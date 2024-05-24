"use client"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {LuLink, LuCheck} from "react-icons/lu";

import React from "react";
import {blogTemplateMetaData} from "@/data/models/templateDataModel"
import {cn} from "@/lib/utils"
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type BlogTemplateCardProps = {
    templateMetaData: blogTemplateMetaData,
    selected?: boolean,
}

function CheckIcon() {
    return (
        <div className={"absolute -right-2 -top-2 w-5 h-5 rounded-xl bg-blue-600 flex justify-center items-center"}>
            <LuCheck size={20} className={"text-white"}/>
        </div>
    )
}

export function BlogTemplateCard({templateMetaData, selected = false}: BlogTemplateCardProps) {
    return (
        <Card className={cn(
            "w-full flex flex-col relative hover:border-blue-600 border-2",
            selected ? "border-blue-300" : ""
        )}>
            {selected ? <CheckIcon/> : null}
            <div className={"w-48 md:w-full h-32 p-2 rounded-xl overflow-hidden "}>
                <Image
                    src={templateMetaData.templateScreenShot}
                    alt={"template"}
                    width={280}
                    height={120}
                />
            </div>
            <CardContent className={"grow p-2 flex flex-row items-center justify-start"}>
                <div className={"grow flex flex-col items-start justify-start justify-items-start pr-4"}>
                    <p className={"text-sm font-semibold"}>{templateMetaData.templateTitle}</p>
                    <p className={"text-sm text-foreground overflow-ellipsis text-nowrap"}>{templateMetaData.templateDescription}</p>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className={"grow-0"} variant={"ghost"} size={"icon"} asChild>
                                <Link href={templateMetaData.templateDemoLink} target={"_blank"}>
                                    <LuLink/>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>前往範例網站</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </CardContent>
        </Card>
    );
}