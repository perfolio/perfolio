import { Transition } from "@headlessui/react"
import React, { useRef } from "react"
import { useInViewport } from "react-in-viewport"

export interface AnimateInViewportProps {
  animate?: boolean
  animateOnlyFirstTime?: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  key?: string
}

export const AnimateInViewport: React.FC<AnimateInViewportProps> = ({
  animate = true,
  animateOnlyFirstTime = true,
  children,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  key,
}): JSX.Element => {
  const myRef = useRef<HTMLDivElement>(null)
  const { inViewport, enterCount } = useInViewport(myRef)

  return (
    <div ref={myRef} key={key} className="h-full">
      {animate ? (
        <Transition
          show={animateOnlyFirstTime ? inViewport || enterCount >= 1 : inViewport}
          enter={enter}
          enterFrom={enterFrom}
          enterTo={enterTo}
          leave={leave}
          leaveFrom={leaveFrom}
          leaveTo={leaveTo}
          className="h-full"
        >
          {children}
        </Transition>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

export default AnimateInViewport
