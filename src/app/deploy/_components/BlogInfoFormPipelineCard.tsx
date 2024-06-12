import { DeployPipelineCardTemplate } from '@/app/deploy/_components/DeployPipelineCardTemplate';
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { LuPlus } from 'react-icons/lu';
import { LuArrowUp, LuArrowDown } from 'react-icons/lu';

import { Form, FormDescription } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { useFieldArray, useForm } from 'react-hook-form';

import {
    Platform,
    validSocialMediaOptionList,
} from '@/domain/entities/BlogMetadata';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialMediaSelectField } from '@/app/deploy/_components/formField/SocialMediaSelectField';
import { useUserData } from '@/components/hooks/useUserData';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { TextInputField } from '@/app/deploy/_components/formField/TextFormField';

import { useDeployData } from '@/app/deploy/_hooks/useDeployData';
import { ActionBar } from '@/app/deploy/_components/ActionBar';
import { z } from 'zod';
import { useSocialMediaSelection } from '@/app/deploy/_hooks/useMultipleChocie';

const socialMediaSchema = z.object({
    platform: z.custom<Platform>().nullable(),
    url: z.string().nullable(),
});

const blogConfigFormSchema = z.object({
    name: z
        .string()
        .min(1, '請輸入部落格名稱')
        .max(20, '部落格名稱不可超過10字'),
    intro: z.string().min(1, '部落格描述不可為空'),
    title: z.string().min(1, '部落格首頁標題不可為空'),
    'social-media': z.array(socialMediaSchema).nullable(),
});

type SocialMediaFormData = z.infer<typeof socialMediaSchema>;
type BlogConfigDataEntity = z.infer<typeof blogConfigFormSchema>;

export function BlogInfoFormPipelineCard() {
    const pipeLineIndex = 1;
    const { nextStep, getStepState, prevStep } = useDeployData();

    const stateData = getStepState(pipeLineIndex);

    const { userData, setUserData, isSyncWithRemoteUpdate, isSyncWithRemote } =
        useUserData();

    const { option, updateOption } = useSocialMediaSelection();

    const form = useForm<BlogConfigDataEntity>({
        resolver: zodResolver(blogConfigFormSchema),
    });

    useEffect(() => {
        const socialMediaLinks: SocialMediaFormData[] = [];

        for (let i = 0; i < validSocialMediaOptionList.length; i++) {
            const platform = validSocialMediaOptionList[i];
            const url = userData.blogConfig.socialMedia[platform];
            if (url !== null && url !== undefined && url !== '') {
                socialMediaLinks.push({
                    platform: platform,
                    url: url,
                });
            }
        }

        form.reset({
            name: userData.blogConfig.blogName,
            intro: userData.blogConfig.blogDescription,
            title: userData.blogConfig.blogHeadline,
            'social-media': socialMediaLinks,
        });
        updateSocialMediaOption();
    }, [isSyncWithRemote]);

    const filedArray = useFieldArray({
        control: form.control,
        name: 'social-media', // unique name for your Field Array
    });

    function _getSocialMedia(platform: Platform) {
        const formField = form.watch('social-media');

        if (formField != null) {
            const field = formField.find(
                (field) => field.platform === platform
            );
            if (field !== undefined && field.url !== null && field.url !== '') {
                return field.url;
            } else {
                return '';
            }
        }
        return '';
        // const fields = formField.find((field) => field.platform === platform);
        // console.log('field', field);
        // if (field !== undefined && field.url !== null && field.url !== '') {
        //     return field.url;
        // } else {
        //     return '';
        // }
    }
    function onSubmit(values: BlogConfigDataEntity) {
        setUserData({
            ...userData,
            blogConfig: {
                ...userData.blogConfig,
                blogName: values.name,
                blogDescription: values.intro,
                blogHeadline: values.title,
                socialMedia: {
                    github: _getSocialMedia(Platform.github),
                    facebook: _getSocialMedia(Platform.facebook),
                    linkedin: _getSocialMedia(Platform.linkedin),
                    instagram: _getSocialMedia(Platform.instagram),
                    threads: _getSocialMedia(Platform.threads),
                    youtube: _getSocialMedia(Platform.youtube),
                },
            },
        });
        nextStep();
    }

    function updateSocialMediaOption() {
        const socialMediaLinks = form.watch('social-media');
        if (socialMediaLinks !== null) {
            const selectedPlatforms: Platform[] = [];
            for (let i = 0; i < socialMediaLinks.length; i++) {
                if (socialMediaLinks[i].platform !== null) {
                    selectedPlatforms.push(socialMediaLinks[i].platform!);
                }
            }
            updateOption(selectedPlatforms);
        }
    }

    function addSocialMedia() {
        filedArray.append({ platform: null, url: '' } as SocialMediaFormData);
    }

    function backToPreviousStep() {
        prevStep();
    }

    return (
        <DeployPipelineCardTemplate
            layout={'row'}
            state={stateData.state}
            title={stateData.title}
            description={stateData.description}
        >
            <Form {...form}>
                <form
                    id={'blog-info'}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        'flex flex-col justify-start items-start space-y-4'
                    )}
                >
                    <TextInputField
                        controller={form.control}
                        isLoading={isSyncWithRemote}
                        name={'name'}
                        label={'部落格名稱'}
                        placeholder={'部落格名稱'}
                        description={'範例： 程式工程師的部落格'}
                    />
                    <TextInputField
                        name={'title'}
                        controller={form.control}
                        isLoading={isSyncWithRemote}
                        label={'部落格首頁標題'}
                        placeholder={'個人部落格首頁的歡迎大字'}
                        description={'範例： Everything Happens for the Best'}
                    />
                    <TextInputField
                        name={'intro'}
                        controller={form.control}
                        isLoading={isSyncWithRemote}
                        label={'部落格首頁介紹'}
                        placeholder={'Your Github Repo'}
                        isTextArea={true}
                        description={
                            '範例： 一個熱愛技術的工程師，專門分享平日的開發、設計與一些隨處迸發的靈感。'
                        }
                    />
                    {isSyncWithRemote ? (
                        <div className={'w-full flex flex-row space-x-4'}>
                            <Skeleton className={'w-24 h-8'} />
                            <Skeleton className={'w-full h-8'} />
                        </div>
                    ) : (
                        <>
                            <Label>社群媒體連結</Label>
                            <FormDescription>
                                請填寫您的社群媒體連結，讓您的讀者可以更快速的找到您的社群媒體
                            </FormDescription>
                            {filedArray.fields.map((field, index) => {
                                return (
                                    <SocialMediaSelectField
                                        key={field.id}
                                        name={`social-media`}
                                        index={index}
                                        controller={form.control}
                                        updatePlatformOption={
                                            updateSocialMediaOption
                                        }
                                        platformOption={option}
                                    />
                                );
                            })}
                            <Button
                                variant={'outline'}
                                type={'button'}
                                className={
                                    'flex flex-row justify-center items-center space-x-2'
                                }
                                disabled={
                                    filedArray.fields.length >=
                                    validSocialMediaOptionList.length
                                }
                                onClick={addSocialMedia}
                            >
                                <LuPlus />
                                新增社群媒體
                            </Button>
                        </>
                    )}

                    <ActionBar
                        isFormSubmitAction={true}
                        back={{
                            label: '回上一步',
                            icon: <LuArrowUp />,
                            onClick: () => backToPreviousStep(),
                        }}
                        next={{
                            label: '下一步',
                            icon: <LuArrowDown />,
                        }}
                    />
                </form>
            </Form>
        </DeployPipelineCardTemplate>
    );
}
