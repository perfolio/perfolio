import React from "react"
import Wrapper from "./wrapper"
import { Text as TextComponent } from "../../text/text"
export interface TextProps {
  align?: "text-left" | "text-center" | "text-right"
  mono?: boolean
}

export const Text: React.FC<TextProps> = ({ children, align = "text-left", mono }): JSX.Element => {
  return (
    <Wrapper>
      <TextComponent align={align} mono={mono}>
        {children}
      </TextComponent>
    </Wrapper>
  )
}
