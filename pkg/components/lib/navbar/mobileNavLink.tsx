import React from "react"
import Link from "next/link"

import { NavLinkProps } from "./types"
export const MobileNavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  icon,
}): JSX.Element => {
  return (
    <Link href={href}>
      <a className="flex items-center p-4 space-x-4 text-gray-darker">
        <div className="w-6 h-6">{icon}</div>
        <p className="cursor-pointer">{label}</p>
      </a>
    </Link>
  )
}
