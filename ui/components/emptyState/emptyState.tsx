import React from "react"
import { ButtonControllerProps, Controller, LinkControllerProps } from "../button/controller"

import { DefaultEmptyStateStyle, DefaultEmptyStateStyleProps } from "./defaultEmptyStateStyle"

export type EmptyStateProps = (LinkControllerProps | ButtonControllerProps) &
  DefaultEmptyStateStyleProps

export const EmptyState: React.FC<EmptyStateProps> = (props): JSX.Element => {
  return (
    <Controller {...props}>
      <DefaultEmptyStateStyle icon={props.icon}>{props.children}</DefaultEmptyStateStyle>
    </Controller>
  )
}
