import React from "react"
import { Avatar } from "../../avatar/avatar"
import { Loading } from "../../loading/loading"
import { Wrapper } from "./wrapper"
export interface ProfileProps {
  src: string | undefined
  title: string | undefined | null
  subtitle?: string
}

export const Profile: React.FC<ProfileProps> = ({ src, title, subtitle }): JSX.Element => {
  return (
    <Wrapper>
      <div className="flex items-center space-x-2">
        {src ? <div className="flex-shrink-0"><Avatar src={src} /></div> : <Loading />}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Wrapper>
  )
}
