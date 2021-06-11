import React from "react"
import Image from "next/image"

export interface MemberProps {
  image: string
  name: string
  title: string
  className?: string
}

export const Member: React.FC<MemberProps> = ({ image, name, title, className }): JSX.Element => {
  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center text-sm whitespace-nowrap">
        <Image
          className="object-cover rounded-full"
          src={image}
          alt={name}
          width="800"
          height="800"
        />
        <span className="mt-4 font-semibold text-center text-gray-900">{name}</span>
        <span className="text-gray-700">{title}</span>
      </div>
    </div>
  )
}
