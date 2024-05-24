import {BlogTemplateCard} from "@/app/dashboard/BlogTemplateCard"
import React, {useState} from "react";
import {DeployPipelineCardTemplate} from "@/app/dashboard/DeployPipelineCardTemplate"
import {blogTemplateMetaData} from "@/data/models/templateDataModel"

type SelectedTemplatePipeLineProps = {
    isCompleted?: boolean,
    // templateGallery: blogTemplateMetaData[],
}

export function SelectedTemplatePipeLine({isCompleted=false}: SelectedTemplatePipeLineProps) {

    const templateGallery: blogTemplateMetaData[] = [
        {
            templateIndex: 1,
            templateTitle: "Blog Builder Example 1",
            templateDescription: "預設樣板，輕鬆簡約",
            templateScreenShot: "/template_image1.png",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 2,
            templateTitle: "線條小狗限定主題",
            templateDescription: "阿金與阿呆的外星冒險",
            templateScreenShot: "/maomao.JPG",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 3,
            templateTitle: "簡約風格",
            templateDescription: "簡約輕巧，純文章分享",
            templateScreenShot: "/template_image2.png",
            templateDemoLink: "https://github.com"
        },
    ]

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