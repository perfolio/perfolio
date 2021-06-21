import { NextPage } from "next"
import { usePortfolio } from "../queries"
import {
  WithSidebar,
  DiversityChart,
  AssetTable,
  ActivityFeed,
  AssetsOverTimeChart,
  MainCard,
  InlineTotalAssetChart,
  withAuthentication,
} from "../components"

const App: NextPage = () => {
  const { portfolio } = usePortfolio()
  let totalAssets = 0
  if (portfolio) {
    Object.values(portfolio).forEach((e) => {
      totalAssets += e.quantity * e.value
    })
  }

  return (
    <WithSidebar
      sidebar={
        <div className="relative">
          <div className="absolute w-full -mt-8 xl:-mt-32 ">{<InlineTotalAssetChart />}</div>
          <div className="mt-4">
            <div className="flex flex-col divide-y">
              <div className="w-full pb-4 md:w-full sm:w-1/2">
                <p className="text-base font-semibold text-gray-800">Diversity</p>
                <div className="w-full mb-8 h-60">{<DiversityChart />}</div>
              </div>
              <div className="w-full py-4 md:w-full sm:w-1/2">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <MainCard title="Overview">
        <div className="py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-0">
            <div className="flex justify-center">
              <div className="flex flex-col space-y-3">
                <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                  Total Assets
                </h4>
                <span className="text-lg font-bold leading-3 text-gray-800 dark:text-gray-100 sm:text-xl md:text-2xl lg:text-3xl">
                  ${totalAssets.toFixed()}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col space-y-3">
                <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                  Last Year
                </h4>

                <span className="text-lg font-bold leading-3 dark:text-success-500 text-success-500 whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
                  + $ 8,566
                </span>
              </div>
            </div>

            <div className="flex justify-center ">
              <div className="flex flex-col space-y-3">
                <h4 className="text-xs font-medium leading-none text-gray-900 uppercase dark:text-gray-400 md:text-sm">
                  Last Month
                </h4>

                <span className="text-lg font-bold leading-3 dark:text-error-500 text-error-600 whitespace-nowrap sm:text-xl md:text-2xl lg:text-3xl">
                  - $ 156
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-56 pt-8">{<AssetsOverTimeChart />}</div>
        <div className="mt-5 rounded md:mt-10">
          <div className="py-4 pl-4 md:py-6 md:pl-6">
            <p className="text-base font-bold leading-tight text-gray-900 md:text-lg lg:text-xl">
              Current Assets (fake)
            </p>
          </div>

          <AssetTable />
        </div>
      </MainCard>
    </WithSidebar>
  )
}
export default withAuthentication(App)
