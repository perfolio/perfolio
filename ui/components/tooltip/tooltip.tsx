import { InformationCircleIcon } from "@heroicons/react/outline"
import { Arrow, Content, Root, Trigger } from "@radix-ui/react-hover-card"
import cn from "classnames"
import React from "react"
export interface TooltipProps {
  side?: "top" | "right" | "bottom" | "left"
  size?: "sm" | "md" | "lg"
  trigger?: React.ReactNode
  asChild?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  trigger,
  children,
  side = "top",
  size = "md",
  asChild,
}): JSX.Element => {
  return (
    <Root>
      <Trigger asChild={asChild} className="appearance-none">
        {trigger ?? (
          <InformationCircleIcon
            className={cn("text-gray-600", {
              "w-3 h-3": size === "sm",
              "w-4 h-4": size === "md",
              "w-6 h-6": size === "lg",
            })}
          />
        )}
      </Trigger>
      <Content
        side={side}
        className="p-2 bg-white border border-gray-200 rounded shadow-lg lg:p-4 xl:p-6"
      >
        <Arrow />
        <div className="max-w-md lg:max-w-lg xl:max-w-xl ">{children}</div>
      </Content>
    </Root>
  )
}
