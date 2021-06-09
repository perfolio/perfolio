import * as z from "zod"
import { Client } from "./client"

export const GetCompanyResponseValidator = z.object({
  /**
   * Ticker of the company.
   */
  symbol: z.string(),
  /**
   * Name of the company.
   */
  companyName: z.string().nullable(),
  /**
   * Number of employees.
   */
  employees: z.number().nullable(),
  /**
   * Refers to Exchange using IEX Supported Exchanges list.
   */
  exchange: z.string().nullable(),
  /**
   * Refers to the industry the company belongs to.
   */
  industry: z.string().nullable(),
  /**
   * Website of the company.
   */
  website: z.string().nullable(),
  /**
   * Description for the company.
   */
  description: z.string().nullable(),
  /**
   * Name of the CEO of the company.
   */
  CEO: z.string().nullable(),
  /**
   * Name of the security.
   */
  securityName: z.string().nullable(),
  /**
   * Refers to the common issue type of the stock.
   *
   * Ad - ADR
   * cs - Common Stock
   * cef - Closed End Fund
   * et - ETF
   * oef - Open Ended Fund
   * ps - Preferred Stock
   * rt - Right
   * struct - Structured Product
   * ut - Unit
   * wi - When Issued
   * wt - Warrant
   * empty - Other.
   */
  issueType: z
    .enum([
      "ad",
      "cs",
      "cef",
      "et",
      "oef",
      "ps",
      "rt",
      "struct",
      "ut",
      "wi",
      "wt",
    ])
    .nullable(),
  /**
   * Refers to the sector the company belongs to.
   */
  sector: z.string().nullable(),
  /**
   * Primary SIC Code for the symbol (if available).
   */
  primarySicCode: z.number().nullable(),
  /**
   * An array of strings used to classify the company.
   */
  tags: z.array(z.string()).nullable(),
  /**
   * Street address of the company if available.
   */
  address: z.string().nullable(),
  /**
   * Street address of the company if available.
   */
  address2: z.string().nullable(),
  /**
   * State of the company if available.
   */
  state: z.string().nullable(),
  /**
   * City of the company if available.
   */
  city: z.string().nullable(),
  /**
   * Zip code of the company if available.
   */
  zip: z.string().nullable(),
  /**
   * Country of the company if available.
   */
  country: z.string().nullable(),
  /**
   * Phone number of the company if available.
   */
  phone: z.string().nullable(),
})

/**
 * Resonse from the `GET /stock/{symbol}/company` endpoint.
 */
export type GetCompanyResponse = z.infer<typeof GetCompanyResponseValidator>

export async function getCompany(symbol: string): Promise<GetCompanyResponse> {
  const client = new Client()

  const res = await client.get({
    path: `/stock/${symbol}/company`,
  })
  return GetCompanyResponseValidator.parse(res)
}
