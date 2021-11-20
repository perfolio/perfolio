import { ApiConfig, Client } from "./client"
import { getCompany, GetCompanyRequest, GetCompanyResponse } from "./company"
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
}
