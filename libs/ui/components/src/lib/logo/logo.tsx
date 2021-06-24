import React from "react"

export interface LogoProps {
  imageColor?: string
  textColor?: string
  withName?: boolean
}

export const Logo: React.FC<LogoProps> = ({ withName, imageColor, textColor }): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className={`w-10 h-10 fill-current ${imageColor} `}
        width="354"
        height="283"
        fill="fill-current"
        viewBox="0 0 354 283"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M247.35 70.671L176.678 0 0 176.678l35.336 35.336L176.678 70.671l35.336 35.336 35.336-35.336zM106.007 212.014l70.671 70.671 176.679-176.678-35.336-35.336-141.343 141.343-35.335-35.336-35.336 35.336z" />
      </svg>

      {/* <svg
        className={`w-10 h-10 stroke-current ${imageColor}`}
        viewBox="0 0 194 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 106.208L97.3883 17.8199L134.158 54.5894M185.07 41.8615L96.6814 130.25L59.9118 93.4803"
          strokeWidth="25"
        />
      </svg> */}
      {withName ? (
        <div className={`text-lg tracking-tight font-semibold ${textColor}`}>
          <span>PERFOLIO</span>
        </div>
      ) : null}
    </div>
  )
}

export default Logo
