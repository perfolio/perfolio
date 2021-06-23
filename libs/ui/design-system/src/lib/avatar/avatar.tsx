import React from "react"
import cn from "classnames"

type Size = "small" | "medium" | "large"

export interface AvatarProps {
  /**
   * URL where to find the image
   */
  src: string

  /**
   * Defaults to medium
   */
  size?: Size

  /**
   * Do not round the avatar
   */
  square?: boolean

  alt: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "medium",
  square,
}): JSX.Element => {
  return (
    <div
      className={cn({
        "w-8 h-8": size === "small",
        "w-10 h-10": size === "medium",
        "w-16 h-16": size === "large",
      })}
    >
      <img src={src} alt={alt} className={square ? "rounded" : "rounded-full"} />
    </div>
  )
}

export default Avatar
