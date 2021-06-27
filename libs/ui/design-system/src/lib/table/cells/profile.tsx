import React from "react"
import Avatar from "../../avatar/avatar"
import Wrapper from "./wrapper"
export interface ProfileProps {
  src: string
  title: string
  subtitle?: string
}

export const Profile: React.FC<ProfileProps> = ({ src, title, subtitle }): JSX.Element => {
  return (
    <Wrapper>
      <div className="flex items-center space-x-2">
        <Avatar src={src} alt={`Image of ${title}`} />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-600">{subtitle} </p>
        </div>
      </div>
    </Wrapper>
  )
}
