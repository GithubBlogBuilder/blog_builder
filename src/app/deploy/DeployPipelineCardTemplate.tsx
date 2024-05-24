import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {LuArrowLeft, LuArrowRight, LuCheck} from "react-icons/lu";
import React, {useState} from "react";
import {BlogTemplateCard} from "@/app/deploy/BlogTemplateCard";
import {cn} from "@/lib/utils";

type DeployPipelineCardProps = {
    pipeLineStep: number,
    title: string,
    description?: string,
    isCompleted?: boolean,
    children: React.ReactNode
}

function CheckIcon () {
    return (
        <div className={"w-7 h-7 rounded-2xl bg-green-600 flex flex-col justify-center items-center"}>
            <LuCheck size={24} className={"text-white"}/>
        </div>
    )
}
export function DeployPipelineCardTemplate({pipeLineStep, isCompleted=false, title, description="", children}: DeployPipelineCardProps) {

    const [isCompletedState, setIsCompleted] = useState(isCompleted)

    function toggleComplete() {
        console.log("Toggle Completed")
        setIsCompleted(!isCompletedState)
    }

    return (
        <div className={cn(
            "w-full flex flex-col border-2 rounded-lg border-foreground/10 p-8 transition-all duration-500",
            isCompletedState ? "space-y-0" : ""
        )}>
            <div className={"flex flex-col items-start justify-start"}>
                <div className={"w-full flex flex-row"}>
                    <div className="grow flex flex-col justify-center pr-4">
                        <p className={"font-bold text-xl"}>{title}</p>
                        <p className={"font-normal text-md"}>{description}</p>
                    </div>
                    <div className={cn(
                        "grow-0 transition-all duration-500",
                        isCompletedState ? "scale-0" : "scale-100")}>
                        <CheckIcon/>
                    </div>
                </div>
                <div className={
                    cn(
                        "w-full transition-all duration-500 ease-out flex flex-col items-center justify-center",
                        isCompletedState ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 max-h-0 min-h-0 h-0"
                    )}>
                    <div className={"py-4"}>
                        {children}
                    </div>
                    <div className={"w-full flex flex-row justify-between"}>
                        <Button
                            variant={"ghost"}
                            disabled={true}
                        >
                            <LuArrowLeft/>
                            <p className={"pl-2"}>上一步</p>
                        </Button>
                        <Button
                            type={"button"}
                            variant={"default"}
                            onClick={() => {
                                toggleComplete()
                            }}
                        >
                            <p className={"pr-2"}>下一步</p>
                            <LuArrowRight/>
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
}