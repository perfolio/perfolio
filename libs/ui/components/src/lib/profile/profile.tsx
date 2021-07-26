import React from "react"
import { Text, Avatar, Loading } from "../.."
export interface ProfileProps {
  image?: string | null
  title?: string | null
  subtitle?: string | null
  /**
   * Display more info in the top right
   */
  tag?: string | null
}

export const Profile: React.FC<ProfileProps> = ({ image, title, subtitle, tag }): JSX.Element => {
  return (
    <div className="flex items-center justify-between w-full gap-4 py-3">
      <div className="flex items-center gap-2">
        <div>{image ? <Avatar src={image} /> : <Loading />}</div>
        <div className="overflow-hidden">
          <Text bold align="text-left">
            {title}
          </Text>
          <Text size="sm" align="text-left">
            {subtitle}
          </Text>
        </div>
      </div>
      <div className="top-0 ">
        <Text size="xs">{tag}</Text>
      </div>
    </div>
  )
}
