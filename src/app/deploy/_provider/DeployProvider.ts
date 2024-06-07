import React, { createContext } from "react";

export enum StepCardState {
    processing = "processing",
    pending = "pending",
    completed = "completed",
    error = "error",
}

export interface DeployState {
    index: number;
    title: string;
    description: string;
    state: StepCardState;
}

export interface DeployEntity {
    currentStep: number;
    pipeLineStatus: DeployState[];
}

export const EmptyDeployEntity: DeployEntity = {
    currentStep: 0,
    pipeLineStatus: [
        {
            index: 0,
            title: "步驟ㄧ 選擇模板",
            description: "選擇一個你喜歡的模板",
            state: StepCardState.processing,
        },
        {
            index: 1,
            title: "步驟二 填寫部落格資訊",
            description: "填寫部落格資訊",
            state: StepCardState.pending,
        },
        {
            index: 2,
            title: "步驟三 部署部落格",
            description: "部署部落格",
            state: StepCardState.pending,
        },
    ],
};

export const DeployContext = createContext({
    deployData: EmptyDeployEntity,
    setDeployData: (deployData: DeployEntity) => {},
});
