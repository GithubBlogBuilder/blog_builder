"use client"

import React from "react"
import Image from "next/image";
import { SelectedTemplatePipeLine } from "@/app/deploy/SlectedTemplatePipeline"
import { DeployPipelineCard } from "@/app/deploy/DeployPipelineCard"
import { blogTemplateMetaData } from "@/data/models/templateDataModel"

type StepCardProps = {
    title: string,
    description: string
    children: React.ReactNode
}

export default function AuthPage() {
    const templateGallery: blogTemplateMetaData[] = [
        {
            templateIndex: 1,
            templateTitle: "Template 1",
            templateDescription: "This is a template",
            templateScreenShot: "/template_image1.png",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 2,
            templateTitle: "Template 2",
            templateDescription: "This is a template",
            templateScreenShot: "/template_image1.png",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 3,
            templateTitle: "Template 3",
            templateDescription: "This is a template",
            templateScreenShot: "/template_image1.png",
            templateDemoLink: "https://github.com"
        },
    ]

    return (
        <div className={"w-full h-svh py-4 flex flex-col justify-start items-start gap-4"}>
            <p className={"text-2xl font-bold"}>
                <span className={"text-primary"}>三步驟 &nbsp; </span>開始打造你的個人部落格
            </p>
            <SelectedTemplatePipeLine isCompleted={true}/>
            <DeployPipelineCard isCompleted={true}/>
        </div>
    )
}