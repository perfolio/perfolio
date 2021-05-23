import { Switch } from "@headlessui/react"
import React, { useState } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/solid"
import { useTheme } from "next-themes"

export const ThemeSwitch: React.FC = (): JSX.Element => {
  const [enabled, setEnabled] = useState(false)
  const { setTheme } = useTheme()
  return (
    <Switch
      checked={enabled}
      onChange={(v) => {
        setEnabled(v)
        setTheme(v ? "dark" : "light")
      }}
      className={`${enabled ? "bg-secondary-dark" : "bg-gray-dark"}
          relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use dark mode</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-4 text-black" : "translate-x-0 text-white"
        }
            pointer-events-none inline-block h-4 w-4 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
      >
        {enabled ? <MoonIcon /> : <SunIcon />}
      </span>
    </Switch>
  )
}
