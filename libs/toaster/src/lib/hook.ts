import { v4 as uuid } from "uuid"
import { useContext } from "react"
import { ToasterContext } from "./provider"
import { ToastProps } from "./toast"

type CreateToastProps = Omit<ToastProps, "id" | "remove">

export type ToastHook = {
  /**
   * Stores all active toasts
   */
  getToasts: () => ToastProps[]

  /**
   * Push a new toast to the stack
   */
  addToast: (toast: CreateToastProps) => void
  /**
   * Remove all toasts
   */
  clearToasts: () => void
}

export const useToaster = (): ToastHook => {
  const ctx = useContext(ToasterContext)

  return {
    getToasts: () => ctx.toasts,
    addToast: (toast: CreateToastProps) => {
      ctx.setToasts([
        ...ctx.toasts,
        {
          ...toast,
          id: uuid(),
          remove: (id: string): void => {
            ctx.setToasts(ctx.toasts.filter((t) => t.id !== id))
          },
        },
      ])
    },
    clearToasts: () => ctx.setToasts([]),
  }
}
