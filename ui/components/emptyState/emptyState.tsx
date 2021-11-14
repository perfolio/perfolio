import React from "react"
import { ButtonControllerProps } from "../clickable/buttonController"
import { LinkControllerProps } from "../clickable/linkController"
import { wrap } from "../clickable/util"
import { DefaultEmptyStateStyle, DefaultEmptyStateStyleProps } from "./defaultEmptyStateStyle"

export type EmptyStateProps = (LinkControllerProps | ButtonControllerProps) &
  DefaultEmptyStateStyleProps

export const EmptyState: React.FC<EmptyStateProps> = (props): JSX.Element => {
  return wrap(
    props,
    <DefaultEmptyStateStyle icon={props.icon}>{props.children}</DefaultEmptyStateStyle>,
  )
}
