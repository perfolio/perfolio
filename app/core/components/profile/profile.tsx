import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import React from "react"
import { useMutation } from "@blitzjs/core"
export const Profile: React.FC = (): JSX.Element => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  return (
    <div className="flex-wrap items-center xl:ml-32 xl:flex">
      {/* Displace the profile to fit main content */}
      <div className="xl:w-3/4 2xl:w-4/5"></div>
      <div className="flex flex-col py-16 space-y-8 xl:w-1/4 2xl:w-1/5 md:py-12">
        <div className="items-center justify-end hidden w-full xl:flex">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="font-semibold text-gray-50">{user?.name}</span>
              <span className="text-xs font-semibold text-white">Premium</span>
              <button
                className="text-xs font-semibold text-white"
                onClick={() => logoutMutation()}
              >
                Log out
              </button>
            </div>
            {/* <img className="w-12 h-12 rounded" src={""} alt="profile" /> */}
          </div>
        </div>
        <div className="w-full p-4 space-y-2 bg-white rounded ">
          <span className="text-sm text-gray-700">Total Investment</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold leading-none text-black">
              $ 27,815
            </span>
            <div className="flex items-center justify-end mt-1 space-x-2">
              <span className="text-xs leaditext-gray-700ng-3 ">Target:</span>
              <span className="text-sm font-semibold text-gray-900">
                $50.000
              </span>
            </div>
          </div>
          <div className="w-full rounded-full mt-3.5 h-1.5 bg-gray-300">
            <div className="w-2/3 h-1.5 bg-primary-900  rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
