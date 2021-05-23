import React from "react"
import Wrapper from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface SimpleProps {
  label: string | number
}

export const Simple = ({ label }: SimpleProps) => {
  return (
    <Wrapper>
      <span className="text-sm leading-5 text-right text-gray-darker">
        {label}
      </span>
    </Wrapper>
  )
}

export default Simple
