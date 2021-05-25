import {
  VaultService,
  GetTransactionsRequest,
  GetTransactionsResponse,
  AddTransactionRequest,
  AddTransactionResponse,
  DeleteTransactionRequest,
} from "./interface"
import { IEXCloud, IEXService } from "services/iexcloud"
import { Database } from "./database/database"

export class Vault implements VaultService {
  private db: Database
  private iex: IEXService

  constructor(dependencies?: { db?: Database; iex?: IEXService }) {
    this.db = dependencies?.db || new Database()
    this.iex = dependencies?.iex || new IEXCloud()
  }
  public async close(): Promise<void> {
    await this.db.close()
  }

  public async addTransaction(
    req: AddTransactionRequest,
  ): Promise<AddTransactionResponse> {
    const getSymbolResponse = await this.iex
      .getSymbol({ isin: req.assetId })
      .catch((err) => {
        throw new Error(`Unable to convert isin to symbol: [ ${err} ]`)
      })
    if (!getSymbolResponse.symbol) {
      throw new Error(
        `No company found, ${req.assetId} is probably not a valid isin`,
      )
    }
    const transaction = await this.db.setTransaction(req).catch((err) => {
      throw new Error(`Unable to store transaction in database: [ ${err} ]`)
    })

    return { transaction }
  }
  public async getTransactions(
    req: GetTransactionsRequest,
  ): Promise<GetTransactionsResponse> {
    const transactions = await this.db
      .getTransactions(req.userId)
      .catch((err) => {
        throw new Error(
          `Unable to load transactions for user ${req.userId}: [ ${err} ]`,
        )
      })
    return { transactions }
  }

  public async deleteTransaction(req: DeleteTransactionRequest): Promise<void> {
    const tx = await this.db.getTransaction(req.transactionId).catch((err) => {
      throw new Error(
        `Unable to load transaction ${req.transactionId}: [ ${err} ]`,
      )
    })

    if (!tx) {
      throw new Error(`No transaction exists with id: ${req.transactionId}`)
    }
    if (tx.userId !== req.userId) {
      throw new Error(`That transaction does not belong to you`)
    }
    await this.db.deleteTransaction(req.transactionId)
  }
}
