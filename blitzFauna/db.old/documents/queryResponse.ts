import { Expr } from "faunadb"
/**
 * This is what the fauna `Get` function usually returns .
 */
export interface QueryResponse<T> {
  ref: Expr
  ts: number
  data: T
}
