import { Head } from "blitz"
import { Section } from "app/core/components"
// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <Section className="flex items-center min-h-screen">
        <div>
          <h1 className="flex items-center justify-center text-transparent divide-x divide-gray-600 bg-clip-text bg-gradient-to-tr from-primary-800 to-info-800 text-shadow-sm">
            <span className="p-3 text-5xl font-black">404</span>
            <span className="p-3 text-xl">Page Not Found</span>
          </h1>
          <p className="mt-8 text-center ">
            Just like guarantees of future returns, this page does not exist.
          </p>
        </div>
      </Section>
    </>
  )
}
