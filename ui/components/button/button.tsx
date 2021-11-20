import React, { MouseEvent, useState } from "react"
import { ButtonControllerProps, Controller, LinkControllerProps } from "./controller"
import { ButtonStyle, ButtonStyleProps } from "./style"

export function Button(props: ButtonStyleProps & ButtonControllerProps): JSX.Element
export function Button(props: ButtonStyleProps & LinkControllerProps): JSX.Element
export function Button(
  props: ButtonStyleProps & (ButtonControllerProps | LinkControllerProps),
): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async (e?: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if ("onClick" in props && props.onClick !== undefined) {
      setIsLoading(true)
      await props.onClick(e)
      setIsLoading(false)
    }
  }
  return (
    <Controller {...props} disabled={props.disabled ?? isLoading} onClick={onClick}>
      <ButtonStyle {...props} loading={isLoading} />
    </Controller>
  )
}
