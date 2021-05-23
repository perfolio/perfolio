import React from "react"
import { NextPage } from "next"
import { AssetTable, LineChart, PieChart } from "pkg/components"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
/**
 * / page.
 */
const Page: NextPage = () => {
  return (
    <div className="px-4 xl:px-0 ">
      <div className="container mx-auto">
        <div className="xl:flex">
          <div className="-mt-8 xl:w-3/4 2xl:w-4/5 xl:-mt-64">
            <div className="py-4 pl-4 rounded-tl-lg rounded-tr-lg shadow bg-gray-lighter md:pl-10 md:py-7">
              <p className="text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
                Overview
              </p>
            </div>
            <div className="px-4 pb-8 bg-white divide-y shadow-lg md:px-8 xl:px-10 divide-gray-light">
              <div className="py-4 sm:py-6 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
                  <div className="flex justify-center">
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-xs font-medium leading-none uppercase text-gray-darker md:text-sm">
                        Total Assets
                      </h4>
                      <span className="text-lg font-bold leading-3 text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
                        $ 27,815
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-xs font-medium leading-none uppercase text-gray-darker md:text-sm">
                        Last Year
                      </h4>

                      <span className="text-lg font-bold leading-3 text-gray-800 text-success-dark whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
                        + $ 8,566
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center ">
                    <div className="flex flex-col space-y-3">
                      <h4 className="text-xs font-medium leading-none uppercase text-gray-darker md:text-sm">
                        Last Month
                      </h4>

                      <span className="text-lg font-bold leading-3 text-gray-800 text-error-dark whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
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
                  <p className="text-base font-bold leading-tight text-gray-darker md:text-lg lg:text-xl">
                    Current Assets
                  </p>
                </div>
                <AssetTable />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pl-4 pr-4 xl:w-1/4 2xl:w-1/5 pt-7 xl:pl-8 pb-7 lg:flex-col md:flex-row xl:pr-0">
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
              <ul className="mt-4 text-sm divide-y divide-gray-light text-gray-dark">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default withPageAuthRequired(Page)
