import React from "react"
import { Wrapper } from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface MultilineProps {
  title: string | number
  content: string | number
}

export const Multiline = ({ title, content }: MultilineProps) => {
  return (
    <Wrapper>
      <span className="text-lg font-medium text-gray-900">{title}</span>
      <p className="text-sm text-gray-500">{content}</p>
    </Wrapper>
  )
}

export default Multiline
