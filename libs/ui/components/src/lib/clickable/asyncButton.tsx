import React, { useState, useCallback } from "react"
import { DefaultButtonStyle } from "./defaultButtonStyle"
import { ButtonProps } from "./types"
import { ButtonController } from "./buttonController"
import { Loading } from "../loading/loading"
/**
 * A button to perform async actions.
 *
 * A loading animation is displayed while the promise resolves.
 *
 */
export const AsyncButton: React.FC<ButtonProps> = ({
  type,
  onClick,
  kind,
  size,
  prefix,
  disabled,
  children,
}): JSX.Element => {
  const [isLoading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    if (onClick) {
      await onClick()
    }
    setLoading(false)
  }, [onClick])

  return (
    <ButtonController
      type={type}
      onClick={(e) => {
        e?.preventDefault()

        if (disabled) {
          return
        }
        handleClick()
      }}
    >
      <DefaultButtonStyle disabled={disabled} kind={kind} size={size} prefix={prefix}>
        {isLoading ? <Loading /> : children}
      </DefaultButtonStyle>
    </ButtonController>
  )
}
