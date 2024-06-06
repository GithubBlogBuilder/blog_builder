import React from "react";
import { Button } from "@/components/ui/button";

type ActionsProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isHidden?: boolean;
};
export function ActionBar({
    isFormSubmitAction = false,
    isHidden = false,
    back = null,
    next,
}: {
    isFormSubmitAction?: boolean;
    isHidden?: boolean;
    back: ActionsProps | null;
    next: ActionsProps;
}) {
    return isHidden ? null : (
        <div className={"w-full flex flex-row justify-between items-center"}>
            {back !== null ? (
                <Button
                    variant={"ghost"}
                    type={"button"}
                    onClick={back.onClick ?? (() => {})}
                    className={
                        "flex flex-row space-x-2 justify-start items-center text-primary hover:text-primary"
                    }
                >
                    {back.icon}
                    <p className={"text-primary"}>{back.label}</p>
                </Button>
            ) : null}
            <Button
                variant={"default"}
                type={!isFormSubmitAction ? "button" : "submit"}
                onClick={next.onClick ?? (() => {})}
                className={"flex flex-row space-x-2 justify-start items-center"}
            >
                <p>{next.label}</p>
                {next.icon}
            </Button>
        </div>
    );
}
