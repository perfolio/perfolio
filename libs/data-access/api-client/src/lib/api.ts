import { HTTPRequestError, JsonUnmarshalError } from "./errors"
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionRequest,
  GetTickerFromFigiRequest,
  GetCompanyRequest,
  GetCompanyResponse,
  GetHistoryResponse,
  GetPriceRequest,
  GetPriceResponse,
  GetPricesRequest,
  GetPricesResponse,
  GetTransactionsResponse,
  SubscribeRequest,
  GetTickerFromFigiResponse,
  SendEmailConfirmationRequest,
  GetExchangesResponse,
  SearchResponse,
  SearchRequest,
} from "@perfolio/api/feature/lambda"
import { JWT } from "@perfolio/feature/tokens"
/**
 * Generic api request to be extended by other request types.
 */
export interface ApiRequest {
  withCookies?: boolean
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
  body?: Record<string | number, unknown>
}

type ApiConfig = {
  sessionId: string
  getToken: () => string | undefined
  setToken: (token: string) => void
}

export class Api {
  sessionId: string
  getToken: () => string | undefined
  setToken: (token: string) => void

  constructor(config: ApiConfig) {
    this.sessionId = config.sessionId
    this.getToken = config.getToken
    this.setToken = config.setToken
  }

  private async requestWithAuth<ResponseType>(req: ApiRequest): Promise<ResponseType> {
    /**
     * If there is no token or it expires within the next 10 seconds.
     *
     * The idea is to get a new one before it expires in case it is still valid on the client
     * but expires before being validated on the server
     */
    let token = this.getToken()
    if (!token || JWT.expiresIn(token) < 10) {
      const { accessToken } = await this.request<{ accessToken: string }>({
        withCookies: true,
        path: "/api/auth/access-token",
        body: { sessionId: this.sessionId },
      })
      this.setToken(accessToken)
      token = accessToken
    }
    return this.request<ResponseType>({ ...req, token })
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
    token,
    withCookies,
  }: ApiRequest): Promise<ResponseType> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = token
    }

    const res = await fetch(path, {
      method: "POST",
      headers,
      credentials: withCookies ? "include" : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })

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
      getTickerFromFigi: async (body: GetTickerFromFigiRequest) =>
        this.requestWithAuth<GetTickerFromFigiResponse>({
          body,
          path: "/api/assets/getTickerFromFigi",
        }),
    }
  }

  public get companies() {
    return {
      getCompany: async (body: GetCompanyRequest) =>
        this.requestWithAuth<GetCompanyResponse>({
          body,
          path: "/api/companies/getCompany",
        }),
    }
  }
  public get emails() {
    return {
      subscribe: async (body: SubscribeRequest) =>
        this.request<void>({ body, path: "/api/emails/subscribe" }),
      sendEmailConfirmation: async (body: SendEmailConfirmationRequest) =>
        this.request<void>({
          body,
          path: "/api/emails/sendEmailConfirmation",
        }),
    }
  }
  public get holdings() {
    return {
      getHistory: async () =>
        this.requestWithAuth<GetHistoryResponse>({ path: "/api/holdings/getHistory" }),
    }
  }
  public get prices() {
    return {
      getPrice: async (body: GetPriceRequest) =>
        this.requestWithAuth<GetPriceResponse>({ body, path: "/api/prices/getPrice" }),
      getPrices: async (body: GetPricesRequest) =>
        this.requestWithAuth<GetPricesResponse>({
          body,
          path: "/api/prices/getPrices",
        }),
    }
  }

  public get transactions() {
    return {
      createTransaction: async (body: CreateTransactionRequest) =>
        this.requestWithAuth<CreateTransactionResponse>({
          body,
          path: "/api/transactions/createTransaction",
        }),
      deleteTransaction: async (body: DeleteTransactionRequest) =>
        this.requestWithAuth<void>({
          body,
          path: "/api/transactions/deleteTransaction",
        }),
      getTransactions: async () =>
        this.requestWithAuth<GetTransactionsResponse>({
          path: "/api/transactions/getTransactions",
        }),
    }
  }

  public get exchanges() {
    return {
      getExchanges: async () =>
        this.requestWithAuth<GetExchangesResponse>({ path: "/api/exchanges/getExchanges" }),
    }
  }
  public get search() {
    return {
      search: async (body: SearchRequest) =>
        this.requestWithAuth<SearchResponse>({ body, path: "/api/search/search" }),
    }
  }
}
