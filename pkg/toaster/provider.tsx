import { AnimateSharedLayout, } from "framer-motion"
import React, { createContext, useState, } from "react"
import { Toast, ToastProps, } from "./toast"

const ERROR_PROVIDER_NOT_USED = new Error("Please wrap your app with the provider first.",)

export interface Toaster {
  /**
   * Stores all active toasts
   */
  toasts: ToastProps[]

  setToasts: (toasts: ToastProps[],) => void
}

/**
 * ToasterContext offers methods to display toast notifications
 *
 * Do not use this directly!!!
 * Use the `useToaster` hook instead
 */
export const ToasterContext = createContext<Toaster>({
  toasts: [],

  setToasts: () => {
    throw ERROR_PROVIDER_NOT_USED
  },
},)

/**
 * ToastProvider should be wrapped around your app in /pages/_app.ts.
 *
 * This sets up the toaster context.
 */
export const ToastProvider: React.FC = ({ children, },) => {
  /**
   * Increment this version to invalidate the local storage on all clients.
   */
  const [toasts, setToasts,] = useState<ToastProps[]>([],)
  return (
    <ToasterContext.Provider
      value={{
        toasts,
        setToasts,
      }}
    >
      {children}
      <div className="fixed bottom-0 right-0 flex flex-col gap-4 p-8 m-4">
        <AnimateSharedLayout>
          {toasts.map((props,) => <Toast key={props.id} {...props} />)}
        </AnimateSharedLayout>
      </div>
      {/* <div className="absolute bottom-0 right-0 flex flex-col p-8 m-4" id="toasterPortal"></div> */}
    </ToasterContext.Provider>
  )
}
