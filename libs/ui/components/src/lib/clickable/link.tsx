import React from "react"
import { DefaultLinkStyle } from "./defaultLinkStyle"
import { LinkProps, ButtonProps } from "./types"
import { wrap } from "./util"

/**
 * A link to either handle an onClick event or redirect a user to a different page.
 * This component will always have the visuals of a link.
 *
 * If you require more control, please use the controllers directly.
 *
 * @param props - Either LinkProps or ButtonProps. Check out `types.ts` for details.
 */
export const Link: React.FC<LinkProps | ButtonProps> = (props): JSX.Element => {
  return wrap(
    props,
    <DefaultLinkStyle
      kind={props.kind}
      size={props.size}
      label={props.label}
      prefix={props.prefix}
      suffix={props.suffix}
      justify={props.justify}
    />,
  )
}
