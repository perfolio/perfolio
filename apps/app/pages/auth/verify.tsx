import React from "react"
import { NextPage, GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Heading, Text } from "@perfolio/ui/design-system"
import Link from "next/link"
const CheckYourEmailPage: NextPage = () => {
  return (
    <section className="relative w-screen h-screen bg-white ">
      <div className="relative items-center justify-center hidden h-full md:flex md:flex-col bg-gradient-to-r from-white to-gray-100">
        <div className="absolute inset-y-0 items-center justify-center hidden md:flex">
          <svg
            className="z-0 w-full h-full p-8 text-gray-100 fill-current"
            viewBox="0 0 354 283"
            fill="fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M247.35 70.671L176.678 0 0 176.678l35.336 35.336L176.678 70.671l35.336 35.336 35.336-35.336zM106.007 212.014l70.671 70.671 176.679-176.678-35.336-35.336-141.343 141.343-35.335-35.336-35.336 35.336z" />
          </svg>
        </div>
        <div className="z-50 flex flex-col items-center justify-center px-8 space-y-4 tracking-tight text-center md:text-left md:items-start md:justify-start md:max-w-3xl">
          <div className="p-20 text-center bg-white rounded shadow-xl">
            <Heading h2>Please verify your email</Heading>
            <div className="h-8"></div>
            <Text bold>We have sent you an email</Text>
            <div className="h-4"></div>

            <Text>Just click on the link in the email to complete your signin.</Text>
            <Text>
              If you don't see it, you may need to{" "}
              <span className="font-medium">check your spam folder</span>.
            </Text>

            <div className="mt-16">
              <Text>
                Need help?{" "}
                <Link href="mailto:info@perfol.io">
                  <a className="underline text-info-500">Contact us</a>
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return { props: {} }
}
export default CheckYourEmailPage
