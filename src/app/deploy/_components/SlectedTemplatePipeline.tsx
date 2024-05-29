"use client"
import {BlogTemplateCard} from "@/app/deploy/_components/BlogTemplateCard"
import React, {useState, useEffect} from "react";
import {DeployPipelineCardTemplate} from "@/app/deploy/_components/DeployPipelineCardTemplate"
import {blogTemplateMetaData} from "@/data/models/blogTemplateDataModel"
import {getTemplateGalleryUseCase} from "@/domain/usecases/deployUsecases/getTemplateGalleryUseCase";
import {BlogTemplateMetaDataDto} from "@/domain/entities/BlogTemplateMetaDataDto";

type SelectedTemplatePipeLineProps = {
    isCompleted?: boolean,
    // templateGallery: blogTemplateMetaData[],
}

export function SelectedTemplatePipeLine({isCompleted=false}: SelectedTemplatePipeLineProps) {

    const [templateGallery, setTemplateGallery] = useState<BlogTemplateMetaDataDto[]>([])
    // getTemplateGalleryUseCase().then(
    //     (data) => {
    //         templateGallery = data
    //     }
    // )
    useEffect(() => {
        getTemplateGalleryUseCase().then(
            (data) => {
                setTemplateGallery(data)
            }
        )
    })


    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)

    const onBack = () => {
        console.log("Back")
    }

    const onNext = () => {
        console.log("Next")
    }

    const onSelected = (templateIndex: number) => {
        setSelectedTemplateIndex(templateIndex)
    }

    return (
        <DeployPipelineCardTemplate
            isCompleted={isCompleted}
            pipeLineStep={1}
            title={"STEP 1 - 選擇樣板"}
            description={"選擇一個你喜歡的樣板，開始打造你的部落格吧"}
        >
            <div className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-start justify-self-stretch"}>
                {
                    templateGallery.map((templateMetaData) => {
                        return (
                            <button  key="toggle" onClick={() => setSelectedTemplateIndex(templateMetaData.templateIndex)}>
                                <BlogTemplateCard
                                    key={`${templateMetaData.templateIndex}`}
                                    templateMetaData={templateMetaData}
                                    selected={selectedTemplateIndex===templateMetaData.templateIndex}/>
                            </button>
                        )
                    })
                }
            </div>
        </DeployPipelineCardTemplate>
    )
}