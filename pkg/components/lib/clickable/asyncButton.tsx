import React, { useState, useCallback } from "react"
import { DefaultButtonStyle } from "./defaultButtonStyle"
import { ButtonProps } from "./types"
import { ButtonController } from "./buttonController"
import { Spinner } from "../spinner/spinner"
/**
 * A button to perform async actions.
 *
 * A loading animation is displayed while the promise resolves.
 *
 */
export const AsyncButton: React.FC<ButtonProps> = (props): JSX.Element => {
  const [isLoading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    await props.onClick()
    setLoading(false)
  }, [props.onClick])

  return (
    <ButtonController
      onClick={(e) => {
        e!.preventDefault()
        handleClick()
      }}
    >
      <DefaultButtonStyle
        label={isLoading ? <Spinner /> : props.label}
        type={props.type}
        size={props.size}
        prefix={props.prefix}
      />
    </ButtonController>
  )
}
