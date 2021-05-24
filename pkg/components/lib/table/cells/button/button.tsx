import React from "react"
import Wrapper from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface ButtonProps {
  color: string
  label?: string
  icon: React.ReactNode
  onClick: () => void
}

export const Button = ({
  color,
  label,
  icon,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <button onClick={onClick} className={`focus:outline-none ${color}`}>
        <span>{icon}</span>
        {label ? <span className="text-sm">{label}</span> : null}
      </button>
    </Wrapper>
  )
}

export default Button
