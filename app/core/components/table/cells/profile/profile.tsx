import React from "react"
import { Wrapper } from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface ProfileProps {
  icon: React.ReactNode
  title: string | number
  content: string | number
}

export const Profile = ({
  title,
  content,
  icon,
}: ProfileProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="flex items-center ">
        <div className="w-10 h-10">{icon}</div>
        <div className="pl-4">
          <p className="font-medium">{title}</p>
          <p className="pt-2 text-xs leading-3 text-gray-600">{content} </p>
        </div>
      </div>
    </Wrapper>
  )
}
