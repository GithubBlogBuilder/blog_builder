import { BlogTemplateCard } from "@/app/deploy/_components/BlogTemplateCard";
import { Separator } from "@/components/ui/separator";
import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import React, { useState } from "react";
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

import { useFieldArray, useForm } from "react-hook-form";
import {
    formSchema,
    Platform,
    PlatformType,
    SocialMediaFormData,
    socialMediaSchema,
} from "@/domain/entities/BlogMetadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SocialMediaSelectField } from "@/app/deploy/_components/SocialMediaSelectField";

type DeployPipelineCardProps = {
    isCompleted?: boolean;
};

function TextInputField({
    controller,
    label,
    name,
    placeholder,
    description,
}: {
    controller: any;
    label: string;
    name: string;
    placeholder: string;
    description: string;
}) {
    return (
        <FormField
            control={controller}
            name={name}
            render={({ field }) => (
                <FormItem className={"w-full"}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

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
    const socialMedialOption = Object.keys(Platform.enum).map(
        (key) => key as PlatformType
    );

    const [option, setOption] = useState<PlatformType[]>(socialMedialOption);

    const fileArrayMaxLength = Object.keys(Platform.enum).length;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blogName: "",
            blogHeadline: "",
            blogDescription: "",
            socialMediaLinks: [],
        },
    });

    const filedArray = useFieldArray({
        control: form.control,
        name: "socialMediaLinks", // unique name for your Field Array
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    function updateSocialMediaOption() {
        const selectedPlatforms = form.getValues("socialMediaLinks");

        if (selectedPlatforms !== null) {
            let platforms = selectedPlatforms.map(
                (socialMedia: SocialMediaFormData) => socialMedia.platform
            );
            // console.log("platforms", platforms);

            let newOption = socialMedialOption.filter(
                (platform) => !platforms.includes(platform)
            );

            // console.log("newOption", newOption);
            setOption(newOption);
            return;
            // return newOption;
        }
        setOption(socialMedialOption);
        // return socialMedialOption;
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
                    className={
                        "w-full flex flex-col justify-center items-start space-y-4"
                    }
                >
                    <TextInputField
                        name={"blogName"}
                        controller={form.control}
                        label={"部落格名稱"}
                        placeholder={"你的部落格名稱"}
                        description={"範例： 阿寬的開發小天地"}
                    />
                    <TextInputField
                        name={"blogHeadline"}
                        controller={form.control}
                        label={"部落格首頁標題"}
                        placeholder={"個人部落格首頁的歡迎大字"}
                        description={"範例： Everything Happens for the Best"}
                    />
                    <TextInputField
                        name={"blogDescription"}
                        controller={form.control}
                        label={"部落格首頁介紹"}
                        placeholder={"Your Github Repo"}
                        description={
                            "範例： 一個熱愛技術的工程師，專門分享平日的開發、設計與一些隨處迸發的靈感。"
                        }
                    />
                    <Label>社群媒體資訊</Label>
                    {filedArray.fields.map((field, index) => {
                        // console.log(field.platform, index);
                        return (
                            <SocialMediaSelectField
                                key={field.id}
                                name={`socialMediaLinks`}
                                index={index}
                                controller={form.control}
                                updatePlatformOption={updateSocialMediaOption}
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
                            filedArray.fields.length >= fileArrayMaxLength
                        }
                        onClick={addSocialMedia}
                    >
                        <LuPlus />
                        新增社群媒體
                    </Button>
                    <Separator />
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
