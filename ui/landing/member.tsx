import Image from "next/image"
import React from "react"

export interface MemberProps {
  image: string
  name: string
  title: string
}

export const Member: React.FC<MemberProps> = ({ image, name, title }): JSX.Element => {
  return (
    <div className="flex space-x-4">
      <Image
        className="object-cover w-20 h-20 mr-4 rounded-full shadow"
        src={image}
        alt={name}
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-gray-800">{title}</p>
      </div>
    </div>
  )
}
