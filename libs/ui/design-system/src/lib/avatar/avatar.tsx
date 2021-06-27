import React from "react"
import cn from "classnames"

type Size = "sm" | "md" | "lg"

export interface AvatarProps {
  /**
   * URL where to find the image
   */
  src: string

  /**
   * Defaults to md
   */
  size?: Size

  /**
   * Do not round the avatar
   */
  square?: boolean

  alt: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md", square }): JSX.Element => {
  return (
    <div
      className={cn({
        "w-8 h-8": size === "sm",
        "w-10 h-10": size === "md",
        "w-16 h-16": size === "lg",
      })}
    >
      <img src={src} alt={alt} className={square ? "rounded" : "rounded-full"} />
    </div>
  )
}

export default Avatar
