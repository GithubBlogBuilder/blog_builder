export interface BlogTemplateMetaDataModel {
    templateIndex: number; // index of the template
    templateTitle: string; // title of the template
    templateDescription: string; // description of the template
    templateScreenShot: string; // screenshot of the template
    templateDemoLink: string; // link to the demo of the template,
    templateGithubRepoLink: string; // link to the repo of the template
}

export function jsonToBlogTemplateMetaDataModel(
    data: any
): BlogTemplateMetaDataModel {
    return {
        templateIndex: data["templateIndex"],
        templateTitle: data["templateTitle"],
        templateDescription: data["templateDescription"],
        templateScreenShot: data["templateScreenShotLoc"],
        templateDemoLink: data["templateDemoLink"],
        templateGithubRepoLink: data["templateGithubRepoLink"],
    } as BlogTemplateMetaDataModel;
}
