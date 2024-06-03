import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaThreads,
    FaYoutube,
} from "react-icons/fa6";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";
import {
    AllValidSocialMediaOptionList,
    Platform,
    PlatformType,
    SocialMediaFormData,
} from "@/domain/entities/BlogMetadata";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const socialMediaUIData = {
    facebook: {
        label: "臉書",
        icon: <FaFacebook />,
    },
    threads: {
        label: "脆",
        icon: <FaThreads />,
    },
    instagram: {
        label: "IG",
        icon: <FaInstagram />,
    },
    linkedin: {
        label: "Linkedin",
        icon: <FaLinkedin />,
    },
    github: {
        label: "Github",
        icon: <FaGithub />,
    },
    youtube: {
        label: "YT",
        icon: <FaYoutube />,
    },
};

function SocialMediaSelectOption({
    platform,
    disable = false,
}: {
    platform: PlatformType;
    disable?: boolean;
}) {
    // console.log("platform", platform);
    return (
        <SelectItem value={platform} disabled={disable}>
            <div
                className={"flex flex-row justify-start items-center space-x-2"}
            >
                {socialMediaUIData[platform].icon}
                <span>{socialMediaUIData[platform].label}</span>
            </div>
        </SelectItem>
    );
}

export function SocialMediaSelectField({
    controller,
    name,
    index,
    platformOption,
    updatePlatformOption,
}: {
    controller: any;
    name: string;
    index: number;
    updatePlatformOption: () => void;
    platformOption: PlatformType[];
}) {
    const selectionFieldName = `${name}.${index}.platform` as const;
    const inputFieldName = `${name}.${index}.url` as const;

    const selectionField = (
        <FormField
            control={controller}
            name={selectionFieldName}
            render={({ field }) => {
                return (
                    <FormItem className="w-[180px]" defaultValue={field.value}>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                                updatePlatformOption();
                            }}
                            defaultValue={field.value ?? undefined}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="選擇社群媒體" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {AllValidSocialMediaOptionList.map(
                                    (platform) => (
                                        <SocialMediaSelectOption
                                            key={`${name}.${index}.${platform}`}
                                            disable={
                                                !platformOption.includes(
                                                    platform
                                                )
                                            }
                                            platform={platform}
                                        />
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </FormItem>
                );
            }}
        />
    );

    const inputField = (
        <FormField
            control={controller}
            name={inputFieldName}
            render={({ field }) => (
                <FormItem className={"w-full"}>
                    <FormControl>
                        <Input placeholder="社群媒體連結" {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
    return (
        <div
            className={
                "w-full flex flex-row justify-center items-center space-x-2"
            }
        >
            {selectionField}
            {inputField}
        </div>
    );
}
