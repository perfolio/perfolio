import { useContext } from "react"
import { ToasterContext } from "./provider"
import { ToastProps } from "./toast"

import { v4 as uuid } from "uuid"

export type ToastHook = {
  /**
   * Stores all active toasts
   */
  getToasts: () => ToastProps[]

  /**
   * Push a new toast to the stack
   */
  addToast: (toast: CreateToast) => void
  /**
   * Remove a single toast by its id
   */
  removeToast(id: string): void
  /**
   * Remove all toasts
   */
  clearToasts: () => void
}

type CreateToast = Pick<ToastProps, "content" | "role"> & Partial<ToastProps>

export const useToaster = (): ToastHook => {
  const ctx = useContext(ToasterContext)

  const removeToast = (id: string): void => {
    ctx.setToasts(ctx.toasts.filter((toast) => toast.id !== id))
  }

  return {
    getToasts: () => ctx.toasts,
    addToast: (toast: CreateToast) => {
      const props: ToastProps = {
        id: toast.id ?? uuid(),
        ttl: toast.ttl ?? 10,
        content: toast.content,
        role: toast.role,
      }

      ctx.setToasts([...ctx.toasts, props])
    },
    removeToast,
    clearToasts: () => ctx.setToasts([]),
  }
}
