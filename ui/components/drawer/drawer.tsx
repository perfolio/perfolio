import React, { Fragment, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import { Button } from "@perfolio/ui/components"
import { useRouter } from "next/router"
export interface DrawerProps {
  open: boolean
  setOpen: (b: boolean) => void
  title?: string | React.ReactNode
  subtitle?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  children,
  title,
  subtitle,
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
  }, [router])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-x-0 bottom-0 flex shadow-2xl h-3/4 md:pt-0">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <div className="relative w-screen">
                <div className="flex flex-col h-full bg-white shadow-radial">
                  <div className="flex-1 ">
                    <div className="flex items-center justify-between w-full h-20 px-4 bg-gray-50 sm:px-6">
                      <div>
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {title}
                        </Dialog.Title>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                      </div>
                      <div className="flex items-center h-7">
                        <Button
                          kind="plain"
                          type="button"
                          shape="square"
                          onClick={() => setOpen(false)}
                          size="auto"
                          prefix={<XIcon />}
                        />
                      </div>
                    </div>
                    {children}
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
