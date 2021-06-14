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
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SubscribeRequest,
  GetAssetResponse,
} from "@perfolio/lambda"
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
  public readonly baseUrl: string
  private readonly token?: string

  constructor(opts?: { token?: string }) {
    this.baseUrl = process.env.NEXT_PUBLIC_PERFOLIO_API_URL ?? "http://localhost:8080"
    this.token = opts?.token
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

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
      mode: "cors",
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
        this.request<GetAssetResponse>({ body, path: "/v1/assets/getAsset" }),
    }
  }

  public get auth() {
    return {
      signup: async (body: SignupRequest) => this.request<void>({ body, path: "/v1/auth/signup" }),
      signin: async (body: SigninRequest) =>
        this.request<SigninResponse>({ body, path: "/api/v1/auth/signin" }),
      signout: async () => this.request<void>({ path: "/v1/auth/signout" }),
      refresh: async () => this.request<RefreshResponse>({ path: "/v1/auth/refresh" }),
    }
  }

  public get companies() {
    return {
      getCompany: async (body: GetCompanyRequest) =>
        this.request<GetCompanyResponse>({ body, path: "/v1/companies/getCompany" }),
    }
  }
  public get emails() {
    return {
      subscribe: async (body: SubscribeRequest) =>
        this.request<void>({ body, path: "/v1/emails/subscribe" }),
    }
  }
  public get holdings() {
    return {
      getHistory: async () => this.request<GetHistoryResponse>({ path: "/v1/holdings/getHistory" }),
    }
  }
  public get prices() {
    return {
      getPrice: async (body: GetPriceRequest) =>
        this.request<GetPriceResponse>({ body, path: "/v1/prices/getPrice" }),
      getPrices: async (body: GetPricesRequest) =>
        this.request<GetPricesResponse>({ body, path: "/v1/prices/getPrices" }),
    }
  }

  public get transactions() {
    return {
      createTransaction: async (body: CreateTransactionRequest) =>
        this.request<CreateTransactionResponse>({
          body,
          path: "/v1/transactions/createTransaction",
        }),
      deleteTransaction: async (body: DeleteTransactionRequest) =>
        this.request<void>({ body, path: "/v1/transactions/deleteTransaction" }),
      getTransactions: async () =>
        this.request<GetTransactionsResponse>({ path: "/v1/transactions/getTransactions" }),
    }
  }
}
