
interface BlogTemplateMetaDataDto{
    templateIndex: number, // index of the template
    templateTitle: string, // title of the template
    templateDescription: string, // description of the template
    templateScreenShot: string, // screenshot of the template
    templateDemoLink: string, // link to the demo of the template
}

class BlogTemplateMetaDataEntity implements BlogTemplateMetaDataDto{
    templateIndex: number
    templateTitle: string
    templateDescription: string
    templateScreenShot: string
    templateDemoLink: string

    constructor(data: BlogTemplateMetaDataDto){
        this.templateIndex = data.templateIndex
        this.templateTitle = data.templateTitle
        this.templateDescription = data.templateDescription
        this.templateScreenShot = data.templateScreenShot
        this.templateDemoLink = data.templateDemoLink
    }

    toDto(): BlogTemplateMetaDataDto{
        return {
            templateIndex: this.templateIndex,
            templateTitle: this.templateTitle,
            templateDescription: this.templateDescription,
            templateScreenShot: this.templateScreenShot,
            templateDemoLink: this.templateDemoLink
        }
    }
}

export type {BlogTemplateMetaDataDto}