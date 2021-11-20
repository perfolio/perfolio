import React from "react"
import { Wrapper } from "./wrapper"

export const Loading: React.FC = (): JSX.Element => {
  return (
    <Wrapper>
      <span className="inline-flex w-full h-2 max-w-xs rounded animate-pulse md:h-3 bg-gradient-to-t from-gray-200 to-gray-300">
      </span>
    </Wrapper>
  )
}

export default Loading
