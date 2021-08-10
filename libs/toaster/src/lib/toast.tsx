import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import { useToaster } from "./hook"

export interface ToastProps {
  /**
   * Unique id
   */
  id: string
  /**
   * How many seconds until the toast closes automatically.
   * Set to 0 to disable
   */
  ttl: number
  role: "success" | "info" | "error"
  content: string
}

export const Toast: React.FC<ToastProps> = ({ id, ttl, role, content }): JSX.Element => {
  const { removeToast } = useToaster()
  useEffect(() => {
    if (ttl <= 0) {
      return
    }

    const timeoutId = setTimeout(() => removeToast(id), ttl * 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
  return createPortal(
    <AnimatePresence>
      <motion.div
        key={id}
        layout
        initial={{ opacity: 0, x: 50, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.5 }}
        role={role}
      >
        <div
          className={cn(
            "text-white px-6 py-4 rounded flex justify-center items-center shadow-xl m-2",
            {
              "bg-success": role === "success",
              "text-black": role === "info",
              "bg-error": role === "error",
            },
          )}
        >
          {content}
          {/* <button
            className="text-2xl font-semibold leading-none bg-transparent outline-none focus:outline-none"
            onClick={() => removeToast(id)}
          >
           <Icon size="xs" label="close">
              <XIcon></XIcon>
            </Icon> 
          </button> */}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.querySelector("#toasterPortal")!,
  )
}
