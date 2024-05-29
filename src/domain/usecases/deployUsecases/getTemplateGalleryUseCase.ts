import {blogTemplateMetaData} from "@/data/models/templateDataModel"


export async function getTemplateGalleryUseCase(){
    const templateGallery: blogTemplateMetaData[] = [
        {
            templateIndex: 1,
            templateTitle: "Blog Builder Default",
            templateDescription: "簡約輕鬆的部落格樣板",
            templateScreenShot: "/template_image1.png",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 2,
            templateTitle: "線條小狗大冒險",
            templateDescription: "快來跟線條小狗玩吧",
            templateScreenShot: "/maomao.JPG",
            templateDemoLink: "https://github.com"
        },
        {
            templateIndex: 3,
            templateTitle: "白紙風格",
            templateDescription: "一片空白",
            templateScreenShot: "/template_image2.png",
            templateDemoLink: "https://github.com"
        },
    ]

    return templateGallery
}