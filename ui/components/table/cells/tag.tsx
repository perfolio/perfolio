import cn from "classnames"
import React from "react"
import { Text as TextComponent } from "../../text/text"
import { Wrapper } from "./wrapper"
type color = "primary" | "success" | "error" | "info"
type shade = "" | "-light" | "-dark"
export interface TagProps {
  align?: "text-left" | "text-center" | "text-right"
  mono?: boolean
  textColor?: `text-${color}${shade}`
  bgColor?: `bg-${color}${shade}`
}

export const Tag: React.FC<TagProps> = ({
  children,
  align = "text-left",
  mono,
  textColor,
  bgColor,
}): JSX.Element => {
  return (
    <Wrapper>
      <TextComponent align={align} mono={mono} color={textColor}>
        <span className={cn(bgColor, "py-1 px-2 rounded")}>{children}</span>
      </TextComponent>
    </Wrapper>
  )
}
