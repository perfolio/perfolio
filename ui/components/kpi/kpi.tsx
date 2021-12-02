import React from "react"
import cn from "classnames"
import { Loading } from ".."

export interface KpiProps {
    label: string
    value: number
    enableColor?: boolean
    isLoading?: boolean
    textAlignment?: "center" | "left" | "right"
    format: (n: number) => string
}

export const KPI: React.FC<KpiProps> = ({
    label,
    value,
    enableColor,
    isLoading,
    textAlignment = "center",
    format,
}): JSX.Element => {
    return (
        <div className="flex justify-center">
            <div className={cn("flex flex-col space-y-3",
                {
                    "text-center": textAlignment === "center",
                    "text-left": textAlignment === "left",
                    "text-right": textAlignment === "right"
                })}>
                <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm whitespace-nowrap">
                    {label}
                </h4>
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
            </div>
        </div>
    )
}

export default KPI
