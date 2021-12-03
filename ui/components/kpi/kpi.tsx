import React from "react"
import cn from "classnames"
import { Loading } from ".."

export interface KpiProps {
    label: string
    value: number
    enableColor?: boolean
    isLoading?: boolean
    justify?: "center" | "start" | "end"
    textAlignment?: "center" | "left" | "right"
    onClickContent?: () => void | Promise<void>
    format: (n: number) => string
}

export const KPI: React.FC<KpiProps> = ({
    label,
    value,
    enableColor,
    isLoading,
    justify = "center",
    textAlignment = "center",
    onClickContent,
    format,
}): JSX.Element => {
    return (
        <div className={cn("flex",
            {
                "justify-center": justify === "center",
                "justify-start": justify === "start",
                "justify-end": justify === "end",
            })}>
            <div className={cn("flex flex-col space-y-3",
                {
                    "text-center": textAlignment === "center",
                    "text-left": textAlignment === "left",
                    "text-right": textAlignment === "right"
                })}>
                <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm whitespace-nowrap">
                    {label}
                </h4>
                <button className={cn({
                    "text-center": textAlignment === "center",
                    "text-left": textAlignment === "left",
                    "text-right": textAlignment === "right"
                })}
                    onClick={onClickContent != undefined ? () => onClickContent() : () => { }}>
                    <span
                        className={cn(
                            "text-lg font-bold leading-3 sm:text-xl md:text-2xl lg:text-3xl",
                            !isLoading && enableColor
                                ? value >= 0
                                    ? "text-success"
                                    : "text-error"
                                : "text-gray-800",
                        )}
                    >
                        {isLoading ? <Loading /> : format(value)}
                    </span>
                </button>
            </div>
        </div >
    )
}

export default KPI
