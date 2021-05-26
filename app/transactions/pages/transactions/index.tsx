import React from "react"
import { WithSidebar } from "app/core/components"
import { BlitzPage, Routes } from "@blitzjs/core"
import { TransactionsTable } from "app/core/components/transactionsTable/transactionsTable"
/**
 * / page.
 */
const TransactionsPage: BlitzPage = () => {
  return (
    <WithSidebar title="My Transactions">
      <TransactionsTable />
    </WithSidebar>
  )
}

TransactionsPage.suppressFirstRenderFlicker = true
TransactionsPage.authenticate = { redirectTo: Routes.LoginPage().pathname }
export default TransactionsPage
