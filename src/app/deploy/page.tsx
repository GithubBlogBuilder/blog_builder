"use client"
import React from "react"
import { SelectedTemplatePipeLine } from "@/app/deploy/_components/SlectedTemplatePipeline"
import { DeployPipelineCard } from "@/app/deploy/_components/DeployPipelineCard"

type StepCardProps = {
    title: string,
    description: string
    children: React.ReactNode
}

export default function AuthPage() {

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