import { Content, Overlay, Root, Trigger, } from "@radix-ui/react-dialog"
import React from "react"
export interface ModalProps {
  /**
   * Element that opens the modal on click.
   * Set to `null` to always display the modal
   */
  trigger: React.ReactNode | null
}

export const Modal: React.FC<ModalProps> = ({ trigger, children, },): JSX.Element => {
  return (
    <Root open={trigger === null ?? undefined}>
      <Trigger>{trigger}</Trigger>
      <Overlay className="w-screen h-screen transition duration-1000 bg-black bg-opacity-90" />
      <Content className="flex items-center justify-center w-screen h-screen">
        <div>{children}</div>
      </Content>
    </Root>
  )
}

export default Modal
