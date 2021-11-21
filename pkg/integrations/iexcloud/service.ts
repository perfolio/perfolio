import { ApiConfig, Client } from "./client"
import { getCompany, GetCompanyRequest, GetCompanyResponse } from "./company"
import { getExchanges, GetExchangesResponse } from "./exchanges"
import { getHistory, GetHistoryRequest, GetHistoryResponse } from "./history"
import { getLogo, GetLogoRequest, GetLogoResponse } from "./logo"

export class IEXService {
  private readonly client: Client

  constructor(config?: ApiConfig) {
    this.client = new Client(config)
  }

  async getCompany(req: GetCompanyRequest): Promise<GetCompanyResponse> {
    return getCompany(this.client, req)
  }
  async getLogo(req: GetLogoRequest): Promise<GetLogoResponse> {
    return getLogo(this.client, req)
  }

  async getHistory(req: GetHistoryRequest): Promise<GetHistoryResponse> {
    return getHistory(this.client, req)
  }

  async getExchanges(): Promise<GetExchangesResponse> {
    return getExchanges(this.client)
  }
}
