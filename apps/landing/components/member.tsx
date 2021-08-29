import React from "react"
import Image from "next/image"

export interface MemberProps {
  image: string
  name: string
  title: string
}

export const Member: React.FC<MemberProps> = ({ image, name, title }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-sm whitespace-nowrap ">
      <div className="w-20 h-20 overflow-hidden rounded-full sm:w-32 sm:h-32 md:w-40 md:h-40">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="object-cover rounded-full "
        />
      </div>
      <span className="mt-4 font-semibold text-center text-gray-900">{name}</span>
      <span className="text-gray-700">{title}</span>
    </div>
  )
}
