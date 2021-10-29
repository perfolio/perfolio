import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import cn from "classnames"
import { Description, Icon } from "@perfolio/ui/components"
import { XIcon } from "@heroicons/react/outline"
import { v4 as uuid } from "uuid"
export interface ToastProps {
  /**
   * Unique id
   */
  id: string
  /**
   * How many seconds until the toast closes automatically.
   * Set to 0 to disable
   */
  ttl?: number
  role?: "info" | "error"
  icon?: React.ReactNode
  title?: string
  content?: string
}

export const Toast: React.FC<ToastProps> = ({
  id = uuid(),
  ttl = 5,
  role = "info",
  title,
  icon,
  content,
}): JSX.Element => {
  const [visible, setVisible] = useState(true)
  const remove = () => setVisible(false)
  useEffect(() => {
    if (ttl <= 0) {
      return
    }
    setTimeout(() => {
      remove()
    }, ttl * 1000)
  }, [id, remove, ttl])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          layout
          key={id}
          initial={{ opacity: 0, x: 20, scale: 0.3 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
          role={role}
          className={cn(
            "flex space-x-4 items-start relative px-6 py-4 rounded shadow-xl max-w-md",
            {
              "text-black bg-white": role === "info",
              "bg-error text-white": role === "error",
            },
          )}
        >
          {icon ? (
            <Icon size="xs" label="Toast icon">
              {icon}
            </Icon>
          ) : null}
          <div className="pr-4">
            <Description title={title}>{content}</Description>
          </div>

          <button
            className="absolute top-0 right-0 p-2 text-2xl font-semibold leading-none bg-transparent outline-none focus:outline-none"
            onClick={() => remove()}
          >
            <Icon size="xs" label="close">
              <XIcon></XIcon>
            </Icon>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
