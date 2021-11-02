import React from "react"
import { Text } from "../../text/text"
import classNames from "classnames"

export interface CardHeaderTitleProps {
  title: string
  subtitle?: string
  contentEditable?: boolean
}

export const CardHeaderTitle: React.FC<CardHeaderTitleProps> = ({
  title,
  subtitle,
  contentEditable = false,
}): JSX.Element => {
  return (
    <div className="flex flex-col space-y-4">
      <span
        className={classNames("text-4xl font-black text-gray-900 ", {
          "px-3 focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none border-gray-200 focus:border-gray-700 focus:bg-gray-50":
            contentEditable,
        })}
        contentEditable={contentEditable}
      >
        {title}
      </span>
      <Text>{subtitle}</Text>
    </div>
  )
}
