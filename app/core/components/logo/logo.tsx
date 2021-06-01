import React from "react"

export interface LogoProps {
  imageColor?: string
  textColor?: string
  withName?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  withName,
  imageColor,
  textColor,
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className={`w-10 h-10 stroke-current ${imageColor}`}
        viewBox="0 0 194 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 106.208L97.3883 17.8199L134.158 54.5894M185.07 41.8615L96.6814 130.25L59.9118 93.4803"
          strokeWidth="25"
        />
      </svg>
      {withName ? (
        <div className={`text-lg tracking-tight font-semibold ${textColor}`}>
          <span>PERFOLIO</span>
        </div>
      ) : null}
    </div>
  )
}

export default Logo
