import React from "react"
import NextLink from "next/link"

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
 * LinkController for arbitrary elements.
 *
 * Wrap another component with this to redirect a user to a new page.
 *
 * If you just want a Link with label please use `Link`.
 * Manually using this should only be done in edge cases where you require more control.
 */
export const LinkController: React.FC<LinkControllerProps> = ({
  href,
  newTab,
  children,
}): JSX.Element => {
  return (
    <NextLink href={href}>
      {newTab ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )}
    </NextLink>
  )
}
