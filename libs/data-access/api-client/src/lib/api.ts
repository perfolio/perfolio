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
  SubscribeRequest,
  GetAssetResponse,
  SendEmailConfirmationRequest,
  ChangeNameRequest,
  UpdateSettingsRequest,
  GetSettingsResponse,
  GetExchangesResponse,
  CreateSettingsRequest,
  CreateSettingsResponse,
  SearchResponse,
  SearchRequest,
} from "@perfolio/api/feature/lambda"
import { JWT } from "@perfolio/feature/tokens"
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
}

export class Api {
  private token?: string

  constructor(opts?: { token?: string }) {
    this.token = opts?.token
  }

  private async refreshAccessToken(): Promise<void> {
    const { accessToken } = await this.request<{ accessToken: string }>({
      path: "/api/auth/getAccessToken",
    })
    this.token = accessToken
  }

  private async requestWithAuth<ResponseType>(req: ApiRequest): Promise<ResponseType> {
    /**
     * If there is no token or it expires within the next 10 seconds.
     *
     * The idea is to get a new one before it expires in case it is still valid on the client
     * but expires "in transit"
     */
    if (!this.token || JWT.expiresIn(this.token) < 10) {
      await this.refreshAccessToken()
    }
    return this.request<ResponseType>(req)
  }

  /**
   * Make a post request to a serverless function
   *
   * Takes the access token from context by default.
   * @param body
   * @param token - Overwrite default token getter.
   */
  private async request<ResponseType>({ path, body }: ApiRequest): Promise<ResponseType> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (this.token) {
      headers["Authorization"] = this.token
    }

    const res = await fetch(path, {
      method: "POST",
      headers,
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
      getAsset: async (body: GetAssetRequest) =>
        this.requestWithAuth<GetAssetResponse>({ body, path: "/api/assets/getAsset" }),
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

  public get settings() {
    return {
      changeName: async (body: ChangeNameRequest) =>
        this.requestWithAuth<void>({
          body,
          path: "/api/settings/changeName",
        }),
      deleteAccount: async () =>
        this.requestWithAuth<void>({
          path: "/api/settings/deleteAccount",
        }),
      getSettings: async () =>
        this.requestWithAuth<GetSettingsResponse>({ path: "/api/settings/getSettings" }),
      updateSettings: async (body: UpdateSettingsRequest) =>
        this.requestWithAuth<GetSettingsResponse>({ body, path: "/api/settings/updateSettings" }),
      createSettings: async (body: CreateSettingsRequest) =>
        this.requestWithAuth<CreateSettingsResponse>({
          body,
          path: "/api/settings/createSettings",
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
