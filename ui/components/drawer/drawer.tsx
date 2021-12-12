import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import { Button, Heading, Text } from "@perfolio/ui/components"
import { useRouter } from "next/router"
import React, { Fragment, useEffect } from "react"
import cn from "classnames"

export interface DrawerProps {
  open: boolean
  setOpen: (b: boolean) => void
  title?: string | React.ReactNode
  subtitle?: string
  height?: "75%" | "83%" | "100%"
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  children,
  title,
  subtitle,
  height = "75%",
}): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpen(false)
    })
    return () => {
      router.events.off("routeChangeStart", () => {
        setOpen(false)
      })
    }
  }, [router, setOpen])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-black bg-opacity-50" />
          </Transition.Child>
          <div
            className={cn("fixed bottom-0 flex md:right-0 md:h-full md:w-1/2 md:pt-0", {
              "h-3/4": height === "75%",
              "h-5/6": height === "83%",
              "h-full": height === "100%",
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-full md:translate-x-full md:translate-y-0"
              enterTo="translate-y-0 translate-x-0"
              leave="transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-0 translate-x-0 "
              leaveTo="translate-y-full md:translate-x-full md:translate-y-0"
            >
              <div className="relative w-screen">
                <div className="flex flex-col h-full bg-white">
                  <div className="flex-1 ">
                    <div className="flex items-center justify-between w-full h-20 px-4 bg-gray-50 sm:px-6">
                      <div>
                        <Dialog.Title>
                          <Heading h3>{title}</Heading>
                        </Dialog.Title>
                        <Text size="sm">{subtitle}</Text>
                      </div>
                      <div className="flex items-center h-10">
                        <Button type="plain" onClick={() => setOpen(false)} icon={<XIcon />} />
                      </div>
                    </div>
                    <div className="w-full h-full px-4 sm:px-6">{children}</div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
