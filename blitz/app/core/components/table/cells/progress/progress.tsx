import React from "react"
import { Wrapper } from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface ProgressProps {
  progress: number
}

export const Progress = ({ progress }: ProgressProps): JSX.Element => {
  return (
    <Wrapper>
      <p className="text-sm font-medium leading-none text-gray-800">
        {progress * 100}%
      </p>
      <div className="w-24 h-3 mt-2 bg-gray-100 rounded-full">
        <div className="w-20 h-3 rounded-full bg-success-progress"></div>
      </div>
    </Wrapper>
  )
}
