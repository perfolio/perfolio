import { Transition } from "@headlessui/react"
import React, { useRef } from "react"
import { useInViewport } from "react-in-viewport"

export interface SectionTitleProps {
  title: string
  tag: string
  animate?: boolean
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  tag,
  animate = false,
}): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null)
  const { inViewport, enterCount } = useInViewport(myRef)

  return (
    <div ref={myRef} className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
      {animate ? (
        <Transition
          appear={true}
          show={inViewport || enterCount >= 1}
          enter="transform transition ease-in-out duration-500 "
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
        >
          <div className="text-center">
            <h2 className="text-base font-semibold tracking-wide text-transparent uppercase bg-gradient-to-tr bg-clip-text from-primary to-secondary">
              {tag}
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {title}
            </p>
          </div>
        </Transition>
      ) : null}
    </div>
  )
}
