import { Footer, Navbar } from "@perfolio/ui/landing"
import { NextPage } from "next"
import Link from "next/link"
import React from "react"
const NotFoundPage: NextPage = (): JSX.Element => {
  return (
    <div>
      <div className="pt-16 -mt-16">
        <div className="fixed inset-x-0 top-0 z-20 bg-white">
          <Navbar />
        </div>
        <div className="flex flex-col h-screen min-h-full pt-16 pb-12 bg-white">
          <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found.
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <Link href="/">
                    <a className="text-base font-medium text-gray-900 hover:text-gray-600">
                      Go back home<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NotFoundPage
