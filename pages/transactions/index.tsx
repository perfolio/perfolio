import React from "react"
import { NextPage } from "next"
import { WithSidebar, TransactionsTable } from "pkg/components"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"

/**
 * / page.
 */
const Page: NextPage = () => {
  return (
    <WithSidebar title="My Transactions">
      <TransactionsTable />
    </WithSidebar>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
