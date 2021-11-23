import { findIsin, FindIsinRequest, FindIsinResponse } from "@perfolio/pkg/integrations/openfigi"
import { DataSource } from "apollo-datasource"
/**
 * Wrapper around prisma to turn it into a DataSource
 */
export class OpenFigi extends DataSource {
  constructor() {
    super()
  }
  async findIsin(
    req: FindIsinRequest,
  ): Promise<FindIsinResponse> {
    return findIsin(req)
  }
}
