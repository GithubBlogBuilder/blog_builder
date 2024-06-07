import React from "react";
import { cn } from "@/lib/utils";

type state =
    | "standBy"
    | "inProgress"
    | "completed"
    | "failed"
    | "warning"
    | "disabled";

const stateColorMap = {
    standBy: {
        text: "text-blue-500",
        prefix: "bg-blue-500",
        background: "bg-blue-50",
    },
    inProgress: {
        text: "text-blue-500",
        prefix: "bg-blue-500",
        background: "bg-blue-50",
    },
    completed: {
        text: "text-green-500",
        prefix: "bg-green-500",
        background: "bg-green-50 dark:bg-green-500/10",
    },
    failed: {
        text: "text-red-500",
        prefix: "bg-red-500",
        background: "bg-red-50",
    },
    warning: {
        text: "text-yellow-500",
        prefix: "bg-yellow-500",
        background: "bg-yellow-50",
    },
    disabled: {
        text: "text-gray-500",
        prefix: "bg-gray-500",
        background: "bg-gray-50",
    },
};

type StatusChipProps = {
    state: state;
    label: string;
    options?: {
        onClick?: () => void;
    };
};
export function StatusChip(
    { state, label, options }: StatusChipProps,
    props: any
) {
    const color = stateColorMap[state];
    return (
        <div
            {...props}
            className={cn(
                "flex flex-row justify-start items-center px-4 py-1 rounded-md",
                color.background
            )}
        >
            <div className={cn(`${color.prefix} w-2 h-2 rounded-full`)}> </div>
            <p className={cn("pl-2 text-md font-bold text-sm", color.text)}>
                {label}
            </p>
        </div>
    );
}
