import React from "react"
import { DefaultButtonStyle } from "./defaultButtonStyle"
import { LinkProps, ButtonProps } from "./types"
import { wrap } from "./util"

/**
 * A button to either handle an onClick event or redirect a user to a different page.
 * This component will always have the visuals of a button.
 *
 * If you require more control, please use the controllers directly.
 *
 * @param props - Either LinkProps or ButtonProps. Check out `types.ts` for details.
 */
export const Button: React.FC<LinkProps | ButtonProps> = (props): JSX.Element => {
  return wrap(
    props,
    <DefaultButtonStyle
      label={props.label}
      type={props.type}
      size={props.size}
      prefix={props.prefix}
    />,
  )
}
