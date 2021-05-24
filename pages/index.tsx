import React from "react"
import { NextPage } from "next"
import { WithSidebar, AssetTable, LineChart, PieChart } from "pkg/components"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
/**
 * / page.
 */
const Page: NextPage = () => {
  return (
    <WithSidebar
      title="Overview"
      sidebar={
        <>
          <div className="w-full md:w-full sm:w-1/2">
            <p className="text-base font-semibold text-gray-800">Diversity</p>
            <div className="h-52">
              <PieChart />
            </div>
          </div>
          <div className="w-full md:w-full sm:w-1/2">
            <p className="text-base font-semibold text-gray-800">
              Recent Activity
            </p>
            <ul className="mt-4 text-sm text-gray-700 divide-y divide-gray-300">
              <li className="py-4 ">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-black">
                    Automatic Import
                  </span>
                  <span className="text-xs">45 min ago</span>
                </div>
                <p>
                  You bought 3.41 <span className="font-semibold">TSLA</span>{" "}
                  shares at $13,311 per share.
                </p>
              </li>
              <li className="py-2 ">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-black">
                    Dividend received
                  </span>
                  <span className="text-xs">2 days ago</span>
                </div>
                <p>
                  You received $14,24 dividends from{" "}
                  <span className="font-semibold">MSFT</span>
                </p>
              </li>
            </ul>
          </div>
        </>
      }
    >
      <div className="py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                Total Assets
              </h4>
              <span className="text-lg font-bold leading-3 text-gray-800 dark:text-gray-100 sm:text-xl md:text-2xl lg:text-3xl">
                $ 27,815
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                Last Year
              </h4>

              <span className="text-lg font-bold leading-3 dark:text-success-500 text-success-700 whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
                + $ 8,566
              </span>
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                Last Month
              </h4>

              <span className="text-lg font-bold leading-3 dark:text-error-500 text-error-700 whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
                - $ 156
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-56 pt-8">
        <LineChart />
      </div>
      <div className="mt-5 rounded-sm md:mt-10">
        <div className="py-4 pl-4 md:py-6 md:pl-6">
          <p className="text-base font-bold leading-tight text-gray-900 md:text-lg lg:text-xl">
            Current Assets
          </p>
        </div>
        <AssetTable />
      </div>
    </WithSidebar>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
