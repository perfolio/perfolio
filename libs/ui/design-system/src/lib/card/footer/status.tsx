import React from "react"
import { Text } from "../../text/text"

export interface CardFooterStatusProps {
  error?: boolean
}

export const CardFooterStatus: React.FC<CardFooterStatusProps> = ({
  children,
  error,
}): JSX.Element => {
  return (
    <Text size="sm" color={error ? "text-error-600" : undefined}>
      {children}
    </Text>
  )
}
