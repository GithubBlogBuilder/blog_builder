import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";
import React, { useState } from "react";
import { BlogTemplateCard } from "@/app/deploy/_components/BlogTemplateCard";
import { cn } from "@/lib/utils";

type DeployPipelineCardProps = {
    pipeLineStep: number;
    title: string;
    description?: string;
    layout: "row" | "column";
    isCompleted?: boolean;
    children: React.ReactNode;
};

function CheckIcon() {
    return (
        <div
            className={
                "w-7 h-7 rounded-2xl bg-green-600 flex flex-col justify-center items-center"
            }
        >
            <LuCheck size={24} className={"text-white"} />
        </div>
    );
}

function CardHeader({
    title,
    description,
    state,
}: {
    title: string;
    description: string;
    state: "processing" | "completed";
}) {
    return (
        <div className={"w-full flex flex-row justify-between"}>
            <div className={"flex flex-col justify-start items-start pr-4"}>
                <p className={"font-bold text-xl"}>{title}</p>
                <p className={"font-normal text-md"}>{description}</p>
            </div>
            <div
                className={cn(
                    "grow-0 transition-all duration-500",
                    state === "processing" ? "scale-0" : "scale-100"
                )}
            >
                <CheckIcon />
            </div>
        </div>
    );
}

export function DeployPipelineCardTemplate({
    pipeLineStep,
    isCompleted = false,
    title,
    layout = "row",
    description = "",
    children,
}: DeployPipelineCardProps) {
    const [isCompletedState, setIsCompleted] = useState(isCompleted);

    function toggleComplete() {
        console.log("Toggle Completed");
        setIsCompleted(!isCompletedState);
    }

    return (
        <div
            className={cn(
                "w-full flex flex-col border-2 rounded-lg border-foreground/10 p-8 transition-all duration-500",
                !isCompletedState ? "space-y-0" : ""
            )}
        >
            <div
                className={cn(
                    layout === "row"
                        ? "flex flex-row justify-start items-center "
                        : "flex flex-col items-start justify-start"
                )}
            >
                <CardHeader
                    title={title}
                    description={description}
                    state={isCompletedState ? "completed" : "processing"}
                />
                <div
                    className={cn(
                        "w-full flex-grow transition-all duration-500 ease-out flex flex-col items-center justify-center",
                        !isCompletedState
                            ? "scale-y-100 opacity-100"
                            : "scale-y-0 opacity-0 max-h-0 min-h-0 h-0"
                    )}
                >
                    <div
                        className={cn("w-full", layout === "row" ? "" : "py-4")}
                    >
                        {children}
                    </div>
                    {/*<div className={"w-full flex flex-row justify-between"}>*/}
                    {/*    <Button variant={"ghost"} disabled={true}>*/}
                    {/*        <LuArrowLeft />*/}
                    {/*        <p className={"pl-2"}>上一步</p>*/}
                    {/*    </Button>*/}
                    {/*    <Button*/}
                    {/*        type={"button"}*/}
                    {/*        variant={"default"}*/}
                    {/*        onClick={() => {*/}
                    {/*            toggleComplete();*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <p className={"pr-2"}>下一步</p>*/}
                    {/*        <LuArrowRight />*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}
