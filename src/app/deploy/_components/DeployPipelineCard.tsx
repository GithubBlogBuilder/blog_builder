import { BlogTemplateCard } from "@/app/deploy/_components/BlogTemplateCard";
import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/blocks/UserAvatar";

type DeployPipelineCardProps = {
    isCompleted?: boolean;
};

export function DeployPipelineCard({
    isCompleted = false,
}: DeployPipelineCardProps) {
    return (
        <DeployPipelineCardTemplate
            isCompleted={isCompleted}
            pipeLineStep={1}
            layout={"row"}
            title={"STEP 3 - 部署你的部落格"}
            description={"部署到 Github Page 上，並開始編輯你的第一個貼文"}
        >
            <div
                className={"flex flex-col justify-center items-start space-y-6"}
            >
                <div
                    className={
                        "w-full flex flex-col justify-center items-start space-y-2"
                    }
                >
                    <Label>Github Owner</Label>
                    <UserAvatar
                        user={{
                            userId: 1,
                            avatarUrl:
                                "https://avatars.githubusercontent.com/u/60366187?v=4",
                            userName: "quan0715",
                        }}
                    ></UserAvatar>
                </div>
                <div
                    className={
                        "w-full flex flex-col justify-center items-start space-y-2"
                    }
                >
                    <Label>你的 Github Repository 名稱</Label>
                    <Input
                        type="text"
                        placeholder="Your Github Repo"
                        className="w-full"
                    />
                    <p className={"text-sm text-foreground/50 font-semibold"}>
                        此名稱在部署後無法變更
                    </p>
                </div>
            </div>
        </DeployPipelineCardTemplate>
    );
}
