import { Switch as HUISwitch } from "@headlessui/react"
import React, { useState } from "react"
export interface SwitchProps {
  onChange: (value: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ onChange }): JSX.Element => {
  const [enabled, setEnabled] = useState(false)

  return (
    <HUISwitch
      checked={enabled}
      onChange={(v) => {
        setEnabled(v)
        onChange(v)
      }}
      className={`${enabled ? "bg-secondary-700" : "bg-gray-700"}
          relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use dark mode</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </HUISwitch>
  )
}
