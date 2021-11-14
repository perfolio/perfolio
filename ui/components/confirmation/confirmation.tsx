import React from "react"
import { Button, Drawer } from "@perfolio/ui/components"

export interface ConfirmationProps {
  severity?: "info" | "warning" | "critical"
  onCancel: () => void | Promise<void>
  onConfirm: () => void | Promise<void>
  trigger?: React.ReactNode
  open: boolean
  setOpen: (b: boolean) => void
}

/**
 * Force the user to delete or cancel
 */
export const Confirmation: React.FC<ConfirmationProps> = ({
  onCancel,
  onConfirm,
  open,
  setOpen,
  children,
  severity = "info",
}): JSX.Element => {
  const severityMapping: Record<string, "primary" | "alert"> = {
    info: "primary",
    warning: "alert",
    critical: "alert",
  }

  return (
    <Drawer open={open} setOpen={setOpen}>
      <div>
        {children}
        <Button
          kind="secondary"
          onClick={async () => {
            setOpen(false)
            await onCancel()
          }}
        >
          Cancel
        </Button>
        <Button
          kind={severityMapping[severity]}
          onClick={async () => {
            setOpen(false)
            await onConfirm()
          }}
        >
          Confirm
        </Button>
      </div>
    </Drawer>
  )
}
