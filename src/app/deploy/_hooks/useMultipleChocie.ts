import {
    Platform,
    SocialMediaFormData,
    validSocialMediaOptionList,
} from "@/domain/entities/BlogMetadata";
import { useEffect, useState } from "react";
import { z } from "zod";

export function useSocialMediaSelection() {
    const [option, setOption] = useState<Platform[]>(
        validSocialMediaOptionList
    );
    // const [selectedPlatforms, setSelectedPlatforms] =
    //     useState<SocialMediaFormData[]>(values);
    // const [selectedPlatforms, setSelectedPlatforms] = useState<z.infer<typeof socialMediaSchema>[] | null>(null);

    // useEffect(() => {
    //     if (selectedPlatforms !== null) {
    //         let platforms = selectedPlatforms.map(
    //             (socialMedia: SocialMediaFormData) => socialMedia.platform
    //         );
    //
    //         let newOption = validSocialMediaOptionList.filter(
    //             (platform) => !platforms.includes(platform)
    //         );
    //
    //         setOption(option);
    //         return;
    //     }
    // }, [selectedPlatforms]);

    function updateOption(selectedPlatforms: Platform[]) {
        if (selectedPlatforms !== null) {
            let newOption = validSocialMediaOptionList.filter(
                (platform) => !selectedPlatforms.includes(platform)
            );

            // console.log("newOption", newOption);

            setOption(newOption);
            return;
        }
    }

    return {
        option,
        // selectedPlatforms,
        // setSelectedPlatforms,
        updateOption,
    };
}
