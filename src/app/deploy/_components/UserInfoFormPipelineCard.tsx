import { BlogTemplateCard } from "@/app/deploy/_components/BlogTemplateCard";
import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import React from "react";

type DeployPipelineCardProps = {
    isCompleted?: boolean;
};
export function UserInfoFormPipelineCard({
    isCompleted = false,
}: DeployPipelineCardProps) {
    return (
        <DeployPipelineCardTemplate
            isCompleted={isCompleted}
            pipeLineStep={1}
            layout={"row"}
            title={"STEP 2 - 樣板設定"}
            description={"設定名稱、介紹、背景圖片等樣板設定"}
        >
            <div
                className={
                    "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-start justify-self-stretch"
                }
            ></div>
        </DeployPipelineCardTemplate>
    );
}
