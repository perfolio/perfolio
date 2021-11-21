import { Close } from "@radix-ui/react-dialog"
import { Modal as Root, ModalProps } from "./modal"

import React from "react"

type NestedModal<P = ModalProps> = React.FC<P> & {
  Close: typeof Close
}

export const Modal = Root as NestedModal
Modal.Close = Close
