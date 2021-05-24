import React from "react"
import Wrapper from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface SimpleProps {
  label: string | number
}

export const Simple: React.FC<SimpleProps> = ({ label }): JSX.Element => {
  return (
    <Wrapper>
      <span className="text-sm leading-5 text-right text-gray-900">
        {label}
      </span>
    </Wrapper>
  )
}

export default Simple
