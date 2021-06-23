import React, { useRef } from "react"
import cn from "classnames"
import * as Radix from "@radix-ui/react-toggle-group"

export interface ToggleItemProps {
  value: string
  /**
   * Display label.
   * @defaults to `value`
   */
  label?: string
  disabled?: boolean
  focus?: boolean
}

export const ToggleItem: React.FC<ToggleItemProps> = ({ label, value, disabled }): JSX.Element => {
  const ref = useRef(null)
  console.log(ref.current)

  return (
    <div ref={ref}>
      <Radix.Item
        value={value}
        disabled={disabled}
        className={cn("p-1", {
          "bg-gray-500": true,
        })}
      >
        {label ?? value}
      </Radix.Item>
    </div>
  )
}
