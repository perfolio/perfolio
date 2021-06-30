import React from "react"
import { Root, Trigger, Overlay, Content } from "@radix-ui/react-dialog"
export interface ModalProps {
  /**
   * Element that opens the modal on click.
   * Set to `null` to always display the modal
   */
  trigger: React.ReactNode | null
}

export const Modal: React.FC<ModalProps> = ({ trigger, children }): JSX.Element => {
  return (
    <Root open={trigger === null ?? undefined}>
      <Trigger>{trigger}</Trigger>
      <Overlay className="w-screen h-screen bg-black bg-opacity-75" />
      <Content className="flex items-center justify-center w-screen h-screen">{children}</Content>
    </Root>
  )
}

export default Modal
