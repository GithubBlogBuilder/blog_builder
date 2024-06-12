'use client';
import { BlogTemplateCard } from '@/app/deploy/_components/BlogTemplateCard';
import React, { useEffect, useState } from 'react';
import { DeployPipelineCardTemplate } from '@/app/deploy/_components/DeployPipelineCardTemplate';
import { BlogTemplateMetaDataEntity } from '@/domain/entities/BlogTemplateMetaDataEntity';
import { useUserData } from '@/components/hooks/useUserData';
import { getTemplateGalleryAction } from '@/actions/BlogAction';
import { Skeleton } from '@/components/ui/skeleton';
import { LuArrowDown } from 'react-icons/lu';
import { useDeployData } from '@/app/deploy/_hooks/useDeployData';
import { ActionBar } from '@/app/deploy/_components/ActionBar';
import { cn } from '@/lib/utils';
import { StepCardState } from '@/app/deploy/_provider/DeployProvider';
import { state } from 'sucrase/dist/types/parser/traverser/base';

function SkeletonTemplateCard() {
    return (
        <>
            <Skeleton className={'w-full h-12 rounded-xl'} />
            <Skeleton className={'w-full h-12 rounded-xl'} />
            <Skeleton className={'w-full h-12 rounded-xl'} />
            <Skeleton className={'w-full h-12 rounded-xl'} />
            <Skeleton className={'w-full h-12 rounded-xl'} />
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

    const isSelected = selectedTemplateIndex !== -1;

    useEffect(() => {
        setSelectedTemplateIndex(userData.blogConfig.templateIndex);
    }, [isSyncWithRemote]);

    function onNextStep() {
        if (isSelected) {
            setUserData({
                ...userData,
                blogConfig: {
                    ...userData.blogConfig,
                    templateIndex: selectedTemplateIndex,
                },
            });
            nextStep();
        }
    }

    const templateCards = templateGallery.map((templateMetaData, index) => {
        const isSelected =
            selectedTemplateIndex === templateMetaData.templateIndex;
        return (
            <button
                className={isSelected ? 'template chosen' : 'template'}
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
            layout={'row'}
            state={stateData.state}
            title={stateData.title}
            description={stateData.description}
        >
            <div>
                {isSyncWithRemote ? (
                    <SkeletonTemplateCard />
                ) : (
                    [...templateCards]
                )}
                <ActionBar
                    isHidden={
                        isSyncWithRemote ||
                        stateData.state != StepCardState.processing
                    }
                    back={null}
                    next={{
                        label: '下一步',
                        icon: <LuArrowDown />,
                        onClick: () => onNextStep(),
                    }}
                />
            </div>
        </DeployPipelineCardTemplate>
    );
}
