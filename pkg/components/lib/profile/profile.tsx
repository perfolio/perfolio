import React from "react"

export const Profile: React.FC = (): JSX.Element => {
  return (
    <div className="flex-wrap items-center xl:ml-32 xl:flex">
      {/* Displace the profile to fit main content */}
      <div className="xl:w-3/4 2xl:w-4/5"></div>
      <div className="flex flex-col py-16 space-y-8 xl:w-1/4 2xl:w-1/5 md:py-12">
        <div className="items-center justify-end hidden w-full xl:flex">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="font-semibold text-gray-lighter">
                Andreas Thomas
              </span>
              <span className="text-xs font-semibold text-white">Premium</span>
            </div>
            <img
              className="w-12 h-12 rounded"
              src="https://avatars.githubusercontent.com/u/18246773?v=4"
              alt="profile"
            />
          </div>
        </div>
        <div className="w-full p-4 space-y-2 bg-white rounded-sm ">
          <span className="text-sm text-gray-dark">Total Investment</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold leading-none text-black">
              $ 27,815
            </span>
            <div className="flex items-center justify-end mt-1 space-x-2">
              <span className="text-xs leaditext-gray-darkng-3 ">Target:</span>
              <span className="text-sm font-semibold text-gray-darker">
                $50.000
              </span>
            </div>
          </div>
          <div className="w-full rounded-full mt-3.5 h-1.5 bg-gray-light">
            <div className="w-2/3 h-1.5 bg-primary-dark  rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
