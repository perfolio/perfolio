import React from "react"
import { Wrapper } from "./wrapper"

export default {
  component: Wrapper,
  title: "components/table/cell/Wrapper",
}

export const primary = (): JSX.Element => {
  return (
    <Wrapper>
      <span>Hello World</span>
    </Wrapper>
  )
}
