import React from "react"
import Link from "next/link"

import { NavLinkProps } from "./types"
export const DesktopNavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  icon,
}): JSX.Element => {
  return (
    <Link href={href}>
      <a className="inline-flex items-center px-3 py-2 space-x-2 text-base font-medium text-white group text-opacity-90 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <div className="w-5 h-5">{icon}</div>
        <span>{label}</span>
      </a>
    </Link>
  )
}
