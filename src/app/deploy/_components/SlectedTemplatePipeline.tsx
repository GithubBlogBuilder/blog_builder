"use client";
import { BlogTemplateCard } from "@/app/deploy/_components/BlogTemplateCard";
import React, { useContext, useEffect, useState } from "react";
import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import { BlogTemplateMetaDataEntity } from "@/domain/entities/BlogTemplateMetaDataEntity";
import { useUserData } from "@/components/hooks/useUserData";
import { getTemplateGalleryAction } from "@/actions/BlogAction";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { useDeployData } from "@/app/deploy/_hooks/useDeployData";
import { ActionBar } from "@/app/deploy/_components/ActionBar";

function SkeletonTemplateCard() {
    return (
        <>
            <Skeleton className={"w-full h-12 rounded-xl"} />
            <Skeleton className={"w-full h-12 rounded-xl"} />
            <Skeleton className={"w-full h-12 rounded-xl"} />
            <Skeleton className={"w-full h-12 rounded-xl"} />
            <Skeleton className={"w-full h-12 rounded-xl"} />
        </>
    );
}

export function SelectedTemplatePipeLine() {
    const pipeLineIndex = 0;

    const { nextStep, getStepState } = useDeployData();

    const stateData = getStepState(pipeLineIndex);

    const [templateGallery, setTemplateGallery] = useState<
        BlogTemplateMetaDataEntity[]
    >([]);

    const { userData, setUserData, isSyncWithRemote, isSyncWithRemoteUpdate } =
        useUserData();

    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

    useEffect(() => {
        getTemplateGalleryAction().then((data) => {
            setTemplateGallery(data);
        });
    }, []);

    useEffect(() => {
        setSelectedTemplateIndex(userData.blogConfig.templateIndex);
    }, [isSyncWithRemote]);

    function onNextStep() {
        setUserData({
            ...userData,
            blogConfig: {
                ...userData.blogConfig,
                templateIndex: selectedTemplateIndex,
            },
        });
        nextStep();
    }

    const templateCards = templateGallery.map((templateMetaData, index) => {
        return (
            <button
                key={`template_${index}`}
                onClick={() => {
                    setSelectedTemplateIndex(templateMetaData.templateIndex);
                }}
            >
                <BlogTemplateCard
                    key={`${templateMetaData.templateIndex}`}
                    templateMetaData={templateMetaData}
                    selected={
                        selectedTemplateIndex === templateMetaData.templateIndex
                    }
                />
            </button>
        );
    });

    return (
        <DeployPipelineCardTemplate
            layout={"row"}
            state={stateData.state}
            title={stateData.title}
            description={stateData.description}
        >
            <div
                className={
                    "w-full flex flex-col justify-center items-start space-y-2"
                    // "md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-start justify-self-stretch"
                }
            >
                {isSyncWithRemote ? (
                    <SkeletonTemplateCard />
                ) : (
                    [...templateCards]
                )}
                <ActionBar
                    isHidden={isSyncWithRemote}
                    back={null}
                    next={{
                        label: "下一步",
                        icon: <LuArrowDown />,
                        onClick: () => onNextStep(),
                    }}
                />
            </div>
        </DeployPipelineCardTemplate>
    );
}
