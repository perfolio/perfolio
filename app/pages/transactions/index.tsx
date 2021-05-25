import React from "react"
import { WithSidebar } from "app/core/components"
import { BlitzPage } from "@blitzjs/core"
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

export default TransactionsPage
