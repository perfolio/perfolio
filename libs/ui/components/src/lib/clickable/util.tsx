import { LinkProps, ButtonProps } from "./types"
import { ButtonController } from "./buttonController"
import { LinkController } from "./linkController"

/**
 * Typeguard to check if props are LinkProps.
 */
function isLink(props: ButtonProps | LinkProps): props is LinkProps {
  return "href" in props
}

/**
 * Typeguard to check if props are ButtonProps.
 */
function isButton(props: ButtonProps | LinkProps): props is ButtonProps {
  return "onClick" in props
}

/**
 * Wrap chooses the controllers depending on the passed props.
 *
 * When passing in ButtonProps you will get a ButtonController  wrapped around
 * the element.
 *
 * @param props - Either ButtonProps or LinkProps.
 * @param element - A JSXElement to display to the user.
 * @returns The element wrapped by the correct controller.
 */
export const wrap = (props: LinkProps | ButtonProps, element: JSX.Element): JSX.Element => {
  if (isButton(props)) {
    return <ButtonController onClick={props.onClick}>{element}</ButtonController>
  }

  if (isLink(props)) {
    return (
      <LinkController href={props.href} newTab={props.newTab}>
        {element}
      </LinkController>
    )
  }

  throw new Error(
    `Either props for a button or a link must be specified, got:\n${JSON.stringify(
      props,
      null,
      2,
    )}`,
  )
}
