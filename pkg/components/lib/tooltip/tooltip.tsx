import React from "react"
import { Root, Trigger, Content, Arrow } from "@radix-ui/react-tooltip"
import classNames from "classnames"
export interface TooltipProps {
  leftIcon?: React.ReactNode
  text: string
  dark?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  dark,
  children,
  leftIcon,
  text,
}): JSX.Element => {
  return (
    <Root>
      <Trigger>{children} </Trigger>
      <Content side="top">
        <Arrow />

        <div
          className={classNames(
            "flex space-x-2 items-center px-4 py-2 text-sm bg-white border text-gray-800 border-gray-600 rounded shadow-xl",
            {
              "bg-gray-800 text-gray-100": dark,
            },
          )}
        >
          <span className="w-4 h-4 text-gray-900">{leftIcon}</span>
          <span>{text}</span>
        </div>
      </Content>
    </Root>
  )
}
