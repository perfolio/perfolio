import React from "react"
import Wrapper from "./wrapper"
import cn from "classnames"
export interface TextProps {
  align?: "text-left" | "text-center" | "text-right"
}

export const Text: React.FC<TextProps> = ({ children, align = "text-left" }): JSX.Element => {
  return (
    <Wrapper>
      <div className={cn("text-sm leading-5 text-gray-700", align)}>{children}</div>
    </Wrapper>
  )
}
