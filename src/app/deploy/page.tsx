"use client";
import React, { createContext, useState } from "react";
import { SelectedTemplatePipeLine } from "@/app/deploy/_components/SlectedTemplatePipeline";
import { DeployPipelineCard } from "@/app/deploy/_components/DeployPipelineCard";
import { BlogInfoFormPipelineCard } from "@/app/deploy/_components/BlogInfoFormPipelineCard";
import { useUserData } from "@/components/hooks/useUserData";
import {
    DeployContext,
    DeployEntity,
    EmptyDeployEntity,
} from "@/app/deploy/_provider/DeployProvider";

export default function AuthPage() {
    const [deployData, setDeployData] =
        useState<DeployEntity>(EmptyDeployEntity);

    return (
        <DeployContext.Provider
            value={{
                deployData,
                setDeployData,
            }}
        >
            <div
                className={
                    "w-full h-svh py-4 flex flex-col justify-start items-start gap-4"
                }
            >
                <p className={"text-2xl font-bold"}>
                    <span className={"text-primary"}>三步驟 &nbsp; </span>
                    開始打造你的個人部落格
                </p>
                <SelectedTemplatePipeLine />
                <BlogInfoFormPipelineCard />
                <DeployPipelineCard />
            </div>
        </DeployContext.Provider>
    );
}
