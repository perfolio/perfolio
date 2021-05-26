import React, { MouseEvent } from "react"

export interface ButtonControllerProps {
  type?: "submit" | "button"
  /**
   * Gets called when the user clicks on the button.
   */
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void | Promise<void>
}
/**
 * ButtonController for arbitrary elements.
 *
 * Wrap another component with this to perform onClick actions.
 *
 * If you just want a button with label please use `Button`.
 * This is intended to be used in edge cases where you require more control.
 */
export const ButtonController: React.FC<ButtonControllerProps> = ({
  onClick,
  type = "button",
  children,
}): JSX.Element => {
  return (
    <button type={type} onClick={onClick} className="w-full focus:outline-none">
      {children}
    </button>
  )
}
