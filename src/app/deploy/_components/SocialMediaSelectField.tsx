import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaThreads,
    FaTwitter,
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

const socialMediaData = {
    facebook: {
        label: "臉書",
        icon: <FaFacebook />,
    },
    // twitter: {
    //     label: "推特",
    //     icon: <FaTwitter />,
    // },
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
                {socialMediaData[platform].icon}
                <span>{socialMediaData[platform].label}</span>
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
    const socialMedialOption = Object.keys(Platform.enum).map(
        (key) => key as PlatformType
    );
    // console.log(platformOption);

    return (
        <div
            className={
                "w-full flex flex-row justify-center items-center space-x-2"
            }
        >
            <FormField
                control={controller}
                name={`${name}.${index}.platform` as const}
                render={({ field }) => {
                    return (
                        <FormItem
                            className="w-[180px]"
                            defaultValue={field.value}
                        >
                            <Select
                                onValueChange={(value) => {
                                    // console.log("value", value);
                                    field.onChange(value);
                                    updatePlatformOption();
                                }}
                                // value={field.value ?? undefined}
                                defaultValue={field.value ?? undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="選擇社群媒體" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {socialMedialOption.map((platform) => (
                                        <SocialMediaSelectOption
                                            key={`${name}.${index}.${platform}`}
                                            disable={
                                                !platformOption.includes(
                                                    platform
                                                )
                                            }
                                            platform={platform}
                                        />
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    );
                }}
            />
            <FormField
                control={controller}
                name={`${name}.${index}.url` as const}
                render={({ field }) => (
                    <FormItem className={"w-full"}>
                        <FormControl>
                            <Input placeholder="社群媒體連結" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
}
