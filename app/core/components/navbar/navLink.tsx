import React from "react"

export interface NavLinkProps {
  label: string
  prefix?: React.ReactNode
  postfix?: React.ReactNode
}

export const NavLink: React.FC<NavLinkProps> = ({ label, prefix, postfix }): JSX.Element => {
  return (
    <div className="inline-flex items-center px-3 py-2 space-x-2 text-base font-medium text-gray-200 group text-opacity-90 hover:text-opacity-100 focus:outline-none">
      <div className="w-5 h-">{prefix}</div>
      <span>{label}</span>
      <div className="w-5 h-5">{postfix}</div>
    </div>
  )
}
