import { Transition } from "@headlessui/react"
import { Icon } from "@perfolio/ui/components"
import React, { useRef } from "react"
import { useInViewport } from "react-in-viewport"

/* eslint-disable-next-line */
export interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
  animate?: boolean
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
  animate = false,
}): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null)
  const { inViewport, enterCount } = useInViewport(myRef)

  const content = () => {
    return (
      <div className="flow-root px-6 pb-8 bg-white rounded shadow-ambient">
        <div className="-mt-6">
          <div>
            <span className="inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-gradient-to-tr from-primary to-secondary">
              <Icon size="sm" label={title} color="text-white">
                {icon}
              </Icon>
            </span>
          </div>
          <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900 uppercase">
            {title}
          </h3>
          <p className="mt-5 text-base text-gray-500">{description} </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={myRef} key={title} className="pt-6 text-center">
      {animate ? (
        <Transition
          appear={true}
          show={inViewport || enterCount >= 1}
          enter="ease-in-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          {content()}
        </Transition>
      ) : (
        <>{content()}</>
      )}
    </div>
  )
}

export default Feature
