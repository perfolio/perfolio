import React, { useState } from "react"
import { useRouter } from "next/router"
import { RequestForm } from "./requestForm"
import { VerifyForm } from "./verifyForm"

export const SignIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<undefined | string>(undefined)
  const router = useRouter()

  return (
    <section className="relative w-screen h-screen bg-gradient-to-t from-gray-100 to-white ">
      <div className="flex flex-col items-center justify-center w-full h-full md:flex-row">
        <div className="absolute flex items-center justify-between w-full space-x-20">
          <span className="w-full border-b border-gray-200"></span>
          <div className="w-full max-w-md space-y-4">
            {!email ? (
              <RequestForm onSuccess={(email: string) => setEmail(email)} />
            ) : (
              <VerifyForm onSuccess={() => router.push("/")} email={email} />
            )}
          </div>

          <span className="w-full border-b border-gray-200"></span>
        </div>
      </div>
    </section>
  )
}
