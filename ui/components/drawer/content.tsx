import cn from "classnames"
import React from "react"
export interface DrawerContentProps {
  center?: boolean
}

export const DrawerContent: React.FC<DrawerContentProps> = (
  { children, center },
): JSX.Element => {
  return (
    <div
      className={cn("w-full sm:px-2", {
        "flex justify-center items-center h-full pt-20 -mt-20": center,
      })}
    >
      <div>{children}</div>
    </div>
  )
}
