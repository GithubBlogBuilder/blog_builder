import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuPlus } from "react-icons/lu";
import {
    LuArrowLeft,
    LuArrowRight,
    LuArrowUp,
    LuArrowDown,
} from "react-icons/lu";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Control, useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import {
    AllValidSocialMediaOptionList,
    BlogConfigDataEntity,
    blogConfigFormSchema,
    Platform,
    PlatformType,
    SocialMediaFormData,
    socialMediaSchema,
} from "@/domain/entities/BlogMetadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialMediaSelectField } from "@/app/deploy/_components/SocialMediaSelectField";
import { getBlogConfigDataAction } from "@/actions/BlogAction";
import { useUserData } from "@/components/hooks/useUserData";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TextInputField } from "@/app/deploy/_components/formField/TextFormField";

type DeployPipelineCardProps = {
    isCompleted?: boolean;
};

type ActionBarProps = {
    isFormSubmitAction?: boolean;
    back: {
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    };
    next: {
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    };
};

function ActionBar({ isFormSubmitAction = false, back, next }: ActionBarProps) {
    return (
        <div className={"w-full flex flex-row justify-between items-center"}>
            <Button
                variant={"ghost"}
                type={"button"}
                onClick={back.onClick}
                className={
                    "p-0 flex flex-row space-x-2 justify-center items-center"
                }
            >
                {back.icon}
                <p>{back.label}</p>
            </Button>
            <Button
                variant={"ghost"}
                type={!isFormSubmitAction ? "button" : "submit"}
                // onClick={next.onClick ?? (() => {})}
                className={
                    "p-0 flex flex-row space-x-2 justify-start items-center text-primary hover:text-primary"
                }
            >
                <p className={"text-primary"}>{next.label}</p>
                {next.icon}
            </Button>
        </div>
    );
}

export function BlogInfoFormPipelineCard({
    isCompleted = false,
}: DeployPipelineCardProps) {
    const [option, setOption] = useState<PlatformType[]>(
        AllValidSocialMediaOptionList
    );

    const { userData } = useUserData();

    const form = useForm<BlogConfigDataEntity>({
        resolver: zodResolver(blogConfigFormSchema),
        defaultValues: async () => {
            return await getBlogConfigDataAction(userData?.userId ?? 0);
        },
    });

    useEffect(() => {
        getBlogConfigDataAction(userData?.userId ?? 0).then((data) => {
            console.log(data);
            if (data !== undefined) {
                form.reset(data as BlogConfigDataEntity);
            }
        });
    }, [form, userData]);

    const filedArray = useFieldArray({
        control: form.control,
        name: "socialMediaLinks", // unique name for your Field Array
    });

    function onSubmit(values: BlogConfigDataEntity) {
        console.log(values);
    }

    function updateSocialMediaOption() {
        const selectedPlatforms = form.getValues("socialMediaLinks");

        if (selectedPlatforms !== null) {
            let platforms = selectedPlatforms.map(
                (socialMedia: SocialMediaFormData) => socialMedia.platform
            );

            let newOption = AllValidSocialMediaOptionList.filter(
                (platform) => !platforms.includes(platform)
            );

            setOption(newOption);
            return;
        }
        setOption(AllValidSocialMediaOptionList);
    }

    function addSocialMedia() {
        updateSocialMediaOption();
        filedArray.append({ platform: null, url: null } as SocialMediaFormData);
    }

    return (
        <DeployPipelineCardTemplate
            isCompleted={isCompleted}
            pipeLineStep={1}
            layout={"row"}
            title={"STEP 2 - 樣板設定"}
            description={"設定名稱、介紹、背景圖片等樣板設定"}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "flex flex-col justify-start items-start space-y-4"
                    )}
                >
                    <TextInputField
                        controller={form.control}
                        isLoading={form.formState.isLoading}
                        name={"blogName"}
                        label={"部落格名稱"}
                        placeholder={"部落格名稱"}
                        description={"範例： 程式工程師的部落格"}
                    />
                    <TextInputField
                        name={"blogHeadline"}
                        controller={form.control}
                        isLoading={form.formState.isLoading}
                        label={"部落格首頁標題"}
                        placeholder={"個人部落格首頁的歡迎大字"}
                        description={"範例： Everything Happens for the Best"}
                    />
                    <TextInputField
                        name={"blogDescription"}
                        controller={form.control}
                        isLoading={form.formState.isLoading}
                        label={"部落格首頁介紹"}
                        placeholder={"Your Github Repo"}
                        isTextArea={true}
                        description={
                            "範例： 一個熱愛技術的工程師，專門分享平日的開發、設計與一些隨處迸發的靈感。"
                        }
                    />
                    {form.formState.isLoading ? (
                        <div className={"w-full flex flex-row space-x-4"}>
                            <Skeleton className={"w-24 h-8"} />
                            <Skeleton className={"w-full h-8"} />
                        </div>
                    ) : (
                        <>
                            <Label>社群媒體連結</Label>
                            <FormDescription>
                                請填寫您的社群媒體連結，讓您的讀者可以更快速的找到您的社群媒體
                            </FormDescription>
                            {filedArray.fields.map((field, index) => {
                                // console.log(field.platform, index);
                                return (
                                    <SocialMediaSelectField
                                        key={field.id}
                                        name={`socialMediaLinks`}
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
                                variant={"outline"}
                                type={"button"}
                                className={
                                    "flex flex-row justify-center items-center space-x-2"
                                }
                                disabled={
                                    filedArray.fields.length >=
                                    AllValidSocialMediaOptionList.length
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
                            label: "回上一步",
                            icon: <LuArrowUp />,
                            onClick: () => {
                                console.log("Back");
                            },
                        }}
                        next={{
                            label: "下一步",
                            icon: <LuArrowDown />,
                        }}
                    />
                </form>
            </Form>
        </DeployPipelineCardTemplate>
    );
}
