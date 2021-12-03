import cn from "classnames"
import React from "react"

export interface DividerProps {
    height?: "xs" | "sm" | "md" | "lg"
}

export const Divider: React.FC<DividerProps> = ({
    height = "sm"
}): JSX.Element => {
    return (
        <hr className={cn(
            {
                "h-px": height === "xs",
                "h-0.5": height === "sm",
                "h-1": height === "md",
                "h-1.5": height === "lg",
            },
            "my-4 bg-gray-400"
        )} />
    )
}

export default Divider
