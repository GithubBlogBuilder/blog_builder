import {BlogTemplateCard} from "@/app/dashboard/BlogTemplateCard";
import {DeployPipelineCardTemplate} from "@/app/dashboard/DeployPipelineCardTemplate";
import React from "react";


type DeployPipelineCardProps = {
    isCompleted?: boolean,
}

export function DeployPipelineCard({isCompleted=false}: DeployPipelineCardProps) {
    return (
        <DeployPipelineCardTemplate
            isCompleted={isCompleted}
            pipeLineStep={1}
            title={"STEP 3 - 部署你的部落格"}
            description={"部署到 Github Page 上，並開始編輯你的第一個貼文"}
        >
            <div className={"w-full grid grid-cols-3 gap-2 justify-center items-center"}>
                {

                }
            </div>
        </DeployPipelineCardTemplate>
    );
}