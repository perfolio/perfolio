import React from "react"
import { WithSidebar } from "app/core/components"
import { BlitzPage, Routes } from "@blitzjs/core"
import { TransactionsTable } from "app/transactions/components"
/**
 * / page.
 */
const TransactionsPage: BlitzPage = () => {
  return (
    <WithSidebar title="My Transactions" sidebar={null}>
      <TransactionsTable />
    </WithSidebar>
  )
}

TransactionsPage.suppressFirstRenderFlicker = true
TransactionsPage.authenticate = { redirectTo: Routes.SigninPage().pathname }
export default TransactionsPage
