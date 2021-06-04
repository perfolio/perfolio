import { BlitzPage, Routes } from "blitz"
import { WithSidebar } from "app/core/components"
// import { AssetsOverTimeChart } from "app/charts/components/assetsOverTime/assetsOverTime"
// import { DiversityChart } from "app/charts/components/diversityChart/diversityChart"
// import { ActivityFeed } from "app/core/components/activity/activityFeed"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <WithSidebar
      title="Overview"
      sidebar={null}
      //   <>
      //     <div className="w-full md:w-full sm:w-1/2">
      //       <p className="text-base font-semibold text-gray-800">Diversity</p>
      //       <div className="h-52">
      //         <DiversityChart />
      //       </div>
      //     </div>
      //     <div className="w-full md:w-full sm:w-1/2">
      //       <ActivityFeed />
      //     </div>
      //   </>
      // }
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

      <div className="w-full h-56 pt-8">
        {/* <AssetsOverTimeChart /> */}
      </div>
      <div className="mt-5 rounded md:mt-10">
        <div className="py-4 pl-4 md:py-6 md:pl-6">
          <p className="text-base font-bold leading-tight text-gray-900 md:text-lg lg:text-xl">
            Current Assets
          </p>
        </div>
        {/* <AssetTable /> */}
      </div>
    </WithSidebar>
  )
}

Home.suppressFirstRenderFlicker = true
Home.authenticate = { redirectTo: Routes.SigninPage().pathname }

export default Home
