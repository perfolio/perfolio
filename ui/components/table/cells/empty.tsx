import React from "react"
import { Wrapper } from "./wrapper"

export const Empty: React.FC = ({ children }): JSX.Element => {
  return <Wrapper>{children}</Wrapper>
}
