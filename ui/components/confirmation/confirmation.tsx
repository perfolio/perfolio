import { Button, Drawer } from "@perfolio/ui/components"
import React from "react"

export interface ConfirmationProps {
  /**
   * Indicates how much the user can screw up.
   * Use `warning` for important confirmations and `critcal` for non reversible changes
   */
  severity?: "info" | "warning" | "critical"

  /**
   * What should happen when the user cancels
   * Can be left empty.
   *
   * The confirmation panel will close automatically
   */
  onCancel?: () => void | Promise<void>

  /**
   * Perform an action when the user clicks the confirm key
   */
  onConfirm: () => void | Promise<void>

  /**
   * Whether the panel is currently open or not
   * Pass in a react state here.
   */
  open: boolean

  /**
   * The react state dispatch function to open/close this panel
   */
  setOpen: (b: boolean) => void

  /**
   * Override the default title
   */
  title?: string | React.ReactNode

  /**
   * Override the default label on the confirm button
   */
  confirmLabel?: string
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  onCancel,
  onConfirm,
  open,
  setOpen,
  children,
  severity = "info",
  title,
  confirmLabel,
}): JSX.Element => {
  const severityMapping: Record<string, "primary" | "error"> = {
    info: "primary",
    warning: "error",
    critical: "error",
  }

  return (
    <Drawer isOpen={open} close={() => setOpen(false)} title={title}>
      <Drawer.Content center>
        <div className="flex flex-col items-center gap-8">
          {children}
          <div className="items-center justify-between block w-full gap-8 space-y-4 sm:flex sm:space-y-0">
            <Button
              size="block"
              type="secondary"
              onClick={async () => {
                if (onCancel) {
                  await onCancel()
                }
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              size="block"
              type={severityMapping[severity]}
              onClick={async () => {
                await onConfirm()
                setOpen(false)
              }}
            >
              {confirmLabel ?? "Confirm"}
            </Button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}
