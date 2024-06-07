import { useState, useEffect, useContext } from "react";
import {
    DeployContext,
    DeployEntity,
    EmptyDeployEntity,
    StepCardState,
} from "@/app/deploy/_provider/DeployProvider";

export function useDeployData() {
    const deployContext = useContext(DeployContext);
    const deployData = deployContext.deployData;
    const setDeployData = deployContext.setDeployData;
    const currentIndex = deployData.currentStep;

    function clearDeployData() {
        setDeployData(EmptyDeployEntity);
    }

    function setCurrentIndex(index: number) {
        setDeployData({
            ...deployData,
            currentStep: index,
        });
    }

    useEffect(() => {
        resetStepState();
    }, []);

    useEffect(() => {
        console.log("useDeployData: toggle currentIndex", currentIndex);
        setDeployData(_getNewStateData(currentIndex));
    }, [currentIndex]);

    function _getNewStateData(stepIndex: number) {
        return {
            ...deployData,
            pipeLineStatus: deployData.pipeLineStatus.map((step, index) => {
                if (index === currentIndex) {
                    return {
                        ...step,
                        state: StepCardState.processing,
                    };
                } else if (index < currentIndex) {
                    return {
                        ...step,
                        state: StepCardState.completed,
                    };
                } else {
                    return {
                        ...step,
                        state: StepCardState.pending,
                    };
                }
            }),
        };
    }
    function resetStepState() {
        setCurrentIndex(0);
    }
    function getStepState(stepIndex: number) {
        return deployData.pipeLineStatus[stepIndex];
    }
    function nextStep() {
        setCurrentIndex(currentIndex + 1);
    }

    function prevStep() {
        setCurrentIndex(currentIndex - 1);
    }

    return {
        deployData,
        nextStep,
        prevStep,
        getStepState,
        setDeployData,
    };
}
