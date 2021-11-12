import React from "react"
import cn from "classnames"
import { Root, Fallback, Image } from "@radix-ui/react-avatar"

import { Text } from "../text/text"
type Size = "xs" | "sm" | "md" | "lg"

export interface AvatarProps {
  /**
   * URL where to find the image
   */
  src: string | undefined

  /**
   * Defaults to md
   */
  size?: Size

  /**
   * Do not round the avatar
   */
  square?: boolean

  fallback?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "md",
  square,
  fallback,
}): JSX.Element => {
  const shape = square ? "rounded" : "rounded-full"

  return (
    <Root>
      <Image
        src={src}
        className={cn(shape, {
          "w-6 h-6": size === "xs",
          "w-8 h-8": size === "sm",
          "w-10 h-10": size === "md",
          "w-16 h-16": size === "lg",
        })}
        alt="Avatar"
      />
      <Fallback
        className={cn(
          shape,
          "w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200",
        )}
      >
        <Text size={size} bold>
          {fallback}
        </Text>
      </Fallback>
    </Root>
  )
}
