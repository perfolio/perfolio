import Link from "next/link"
import React, { MouseEvent } from "react"

export interface ButtonControllerProps {
  htmlType?: "submit" | "button"
  /**
   * Gets called when the user clicks on the button.
   */
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void | Promise<void>

  disabled?: boolean
}

export interface LinkControllerProps {
  /**
   * Relative to this page or absolute url.
   */
  href: string

  /**
   * Opens a new browser page when clicking on it.
   */
  newTab?: boolean
}

/**
 * Typeguard to check if props are LinkProps.
 */
function isLink(props: ButtonControllerProps | LinkControllerProps): props is LinkControllerProps {
  return "href" in props
}

export function Controller(props: React.PropsWithChildren<ButtonControllerProps>): JSX.Element
export function Controller(props: React.PropsWithChildren<LinkControllerProps>): JSX.Element
export function Controller(
  props: React.PropsWithChildren<ButtonControllerProps | LinkControllerProps>,
): JSX.Element {
  if (isLink(props)) {
    return (
      <Link href={props.href}>
        {props.newTab ? (
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full focus:outline-none"
          >
            {props.children}
          </a>
        ) : (
          <a href={props.href} className="w-full focus:outline-none">
            {props.children}
          </a>
        )}
      </Link>
    )
  }
  return (
    <button
      type={props.htmlType ?? "button"}
      onClick={props.onClick}
      className="w-full focus:outline-none"
    >
      {props.children}
    </button>
  )
}
