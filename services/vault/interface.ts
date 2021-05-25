import { Prisma, Transaction } from "@prisma/client"
import { Time } from "pkg/time"

export interface VaultService {
  addTransaction(req: AddTransactionRequest): Promise<AddTransactionResponse>
  getTransactions(req: GetTransactionsRequest): Promise<GetTransactionsResponse>
  deleteTransaction(req: DeleteTransactionRequest): Promise<void>

  // getPortfolio(req: GetPortfolioRequest): Promise<GetPortfolioResponse>

  // getHistory(req: GetHistoryRequest): Promise<GetHistoryResponse>
}

export type AddTransactionRequest = Prisma.TransactionCreateInput

export type AddTransactionResponse = {
  transaction: Transaction
}

export type GetTransactionsRequest = {
  userId: string
}
export type GetTransactionsResponse = {
  transactions: Transaction[]
}

export type DeleteTransactionRequest = {
  userId: string
  transactionId: string
}

export type GetPortfolioRequest = {
  userId: string
}

export type Asset = {
  id: string
  // The current value
  value: number
  // How much the user has payed for it including taxes etc.
  cost: number
  // How many shares the user has right now.
  quantity: number
}

export type GetPortfolioResponse = {
  assets: Asset[]
}

export type GetHistoryRequest = {
  userId: string
}
export type Datum = {
  time: Time
  value: number
}

export type GetHistoryResponse = {
  history: Datum[]
}
