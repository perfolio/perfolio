import { Stock, Transaction, ResolverFn } from "@perfolio/api/graphql"
import { Context } from "../../context"

export const asset: ResolverFn<Stock | null, Transaction, Context, unknown> = async (
  transaction,
  _args,
  ctx,
) => {
  ctx.authenticateUser()

  return {
    id: transaction.asset.id,
    ticker: transaction.asset.id,
    exchanges: [],
  }
}
