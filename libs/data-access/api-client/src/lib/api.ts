import { HTTPRequestError, JsonUnmarshalError } from "./errors"
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionRequest,
  GetAssetRequest,
  GetCompanyRequest,
  GetCompanyResponse,
  GetHistoryResponse,
  GetPriceRequest,
  GetPriceResponse,
  GetPricesRequest,
  GetPricesResponse,
  GetTransactionsResponse,
  RefreshResponse,
  SubscribeRequest,
  GetAssetResponse,
  SendEmailConfirmationRequest,
} from "@perfolio/api/feature/lambda"
/**
 * Generic api request to be extended by other request types.
 */
export interface ApiRequest {
  /**
   * JWT token to authenticate the current user.
   */
  token?: string

  /**
   * Url path appended to the baseUrl.
   */
  path: string

  /**
   * Send a body with the request. Must be json serializable.
   */
  body?: unknown

  /**
   * Automatically refreshes the access token when it has expired.
   */
  silentRefresh?: boolean
}

export class Api {
  public readonly baseUrl: string
  private token?: string

  constructor(opts?: { token?: string }) {
    this.baseUrl = process.env.NEXT_PUBLIC_PERFOLIO_API_URL ?? "http://localhost:8080"
    this.token = opts?.token
  }

  private async silentRefresh(): Promise<void> {
    if (!this.token) {
      const { accessToken } = await fetch("/api/auth/getAccessToken", {
        method: "POST",
      }).then((res) => res.json())
      this.token = accessToken
      console.log("AccessToken refreshed.")
    }
  }
  /**
   * Make a post request to a serverless function
   *
   * Takes the access token from context by default.
   * @param body
   * @param token - Overwrite default token getter.
   */
  private async request<ResponseType>({
    path,
    body,
    silentRefresh,
  }: ApiRequest): Promise<ResponseType> {
    if (silentRefresh) {
      await this.silentRefresh()
    }
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (this.token) {
      headers["Authorization"] = this.token
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
      mode: "cors",
    })

    if (res.status === 401) {
      await this.silentRefresh()
    }

    if (res.status !== 200) {
      throw new HTTPRequestError(
        `Unable to POST to endpoint ${path}, failed with status: ${res.status}`,
      )
    }
    return res.json().catch((err) => {
      throw new JsonUnmarshalError(err)
    })
  }
  public get assets() {
    return {
      getAsset: async (body: GetAssetRequest) =>
        this.request<GetAssetResponse>({ body, path: "/v1/assets/getAsset", silentRefresh: true }),
    }
  }

  public get auth() {
    return {
      refresh: async () => this.request<RefreshResponse>({ path: "/v1/auth/refresh" }),
    }
  }

  public get companies() {
    return {
      getCompany: async (body: GetCompanyRequest) =>
        this.request<GetCompanyResponse>({
          body,
          path: "/v1/companies/getCompany",
          silentRefresh: true,
        }),
    }
  }
  public get emails() {
    return {
      subscribe: async (body: SubscribeRequest) =>
        this.request<void>({ body, path: "/v1/emails/subscribe", silentRefresh: true }),
      sendEmailConfirmation: async (body: SendEmailConfirmationRequest) =>
        this.request<void>({ body, path: "/v1/emails/sendEmailConfirmation", silentRefresh: true }),
    }
  }
  public get holdings() {
    return {
      getHistory: async () =>
        this.request<GetHistoryResponse>({ path: "/v1/holdings/getHistory", silentRefresh: true }),
    }
  }
  public get prices() {
    return {
      getPrice: async (body: GetPriceRequest) =>
        this.request<GetPriceResponse>({ body, path: "/v1/prices/getPrice", silentRefresh: true }),
      getPrices: async (body: GetPricesRequest) =>
        this.request<GetPricesResponse>({
          body,
          path: "/v1/prices/getPrices",
          silentRefresh: true,
        }),
    }
  }

  public get transactions() {
    return {
      createTransaction: async (body: CreateTransactionRequest) =>
        this.request<CreateTransactionResponse>({
          body,
          path: "/v1/transactions/createTransaction",
          silentRefresh: true,
        }),
      deleteTransaction: async (body: DeleteTransactionRequest) =>
        this.request<void>({
          body,
          path: "/v1/transactions/deleteTransaction",
          silentRefresh: true,
        }),
      getTransactions: async () =>
        this.request<GetTransactionsResponse>({
          path: "/v1/transactions/getTransactions",
          silentRefresh: true,
        }),
    }
  }
}
