import { DeployPipelineCardTemplate } from "@/app/deploy/_components/DeployPipelineCardTemplate";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/blocks/UserAvatar";
import { useDeployData } from "@/app/deploy/_hooks/useDeployData";
import { useUserData } from "@/components/hooks/useUserData";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionBar } from "@/app/deploy/_components/ActionBar";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { GrDeploy } from "react-icons/gr";
import { TextInputField } from "@/app/deploy/_components/formField/TextFormField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { startDeployAction } from "@/actions/BlogAction";
import { useRouter, usePathname } from "next/navigation";

const deployFormSchema = z.object({
    blogRepoName: z.string().min(1, "請輸入部落格名稱"),
});
type deployFormSchemaType = z.infer<typeof deployFormSchema>;
export function DeployPipelineCard() {
    const pipeLineIndex = 2;

    const { nextStep, prevStep, getStepState } = useDeployData();

    const deployStepData = getStepState(pipeLineIndex);

    const { userData, setUserData, isSyncWithRemote, isSyncWithRemoteUpdate } =
        useUserData();

    const form = useForm<deployFormSchemaType>({
        resolver: zodResolver(deployFormSchema),
        defaultValues: {
            blogRepoName: userData.blogRepoName,
        },
    });

    useEffect(() => {
        form.setValue("blogRepoName", userData.blogRepoName || "");
    }, [isSyncWithRemote]);

    const router = useRouter();

    async function onSubmit(values: deployFormSchemaType) {
        console.log(values);
        // update to user data
        setUserData({
            ...userData,
            blogRepoName: values.blogRepoName,
        });

        // run deploy action
        await startDeployAction(userData);

        nextStep();

        // delay 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/dashboard");
    }

    return (
        <DeployPipelineCardTemplate
            layout={"row"}
            title={deployStepData.title}
            description={deployStepData.description}
            state={deployStepData.state}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={
                        "flex flex-col justify-center items-start space-y-6"
                    }
                >
                    <div
                        className={
                            "w-full flex flex-col justify-center items-start space-y-2"
                        }
                    >
                        {" "}
                        {isSyncWithRemote ? (
                            <Skeleton className={"w-full h-4 rounded-xl"} />
                        ) : (
                            <Label>Github Owner</Label>
                        )}
                        <UserAvatar
                            user={userData.githubUser}
                            isLoading={isSyncWithRemote}
                        ></UserAvatar>
                    </div>
                    <TextInputField
                        isLoading={isSyncWithRemote}
                        label={"你的 Github Repository 名稱"}
                        placeholder={"Your Github Repo"}
                        description={"此名稱在部署後無法變更"}
                        controller={form.control}
                        name={"blogRepoName"}
                    />
                    {!isSyncWithRemote ? (
                        <ActionBar
                            isFormSubmitAction={true}
                            back={{
                                label: "更改資訊",
                                icon: <LuArrowUp />,
                                onClick: () => prevStep(),
                            }}
                            next={{
                                label: "部署",
                                icon: <GrDeploy />,
                                // onClick: () => nextStep(),
                            }}
                        />
                    ) : null}
                </form>
            </Form>
        </DeployPipelineCardTemplate>
    );
}
