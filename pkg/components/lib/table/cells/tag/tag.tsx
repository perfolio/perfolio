import React from "react"
import { Wrapper } from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface TagProps {
  label: string | number | React.ReactNode
  color: string
}

export const Tag = ({ label, color }: TagProps): JSX.Element => {
  const colors = `text-${color}-700 bg-${color}-50`

  return (
    <Wrapper>
      <span className={`inline-flex px-2 text-sm rounded-sm ${colors}`}>
        {label}
      </span>
    </Wrapper>
  )
}

export default Tag
