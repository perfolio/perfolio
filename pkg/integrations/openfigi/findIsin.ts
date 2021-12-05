import * as z from "zod"
import { Client } from "./client"

const MappingValidation = z.object({
  figi: z.string(),
  name: z.string(),
  ticker: z.string(),
  exchCode: z.string(),
  compositeFIGI: z.string(),
  securityType: z.enum(["Common Stock", "ETP", "REIT"]),
  marketSector: z.string(),
  shareClassFIGI: z.string().nullish(),
  securityType2: z.enum(["Common Stock", "Mutual Fund", "REIT"]),
  securityDescription: z.string().nullish(),
})

const MappingResponse = z
  .array(
    z.object({
      data: z.array(MappingValidation).nonempty(),
    }),
  )
  .nonempty()

export type FindIsinResponse = z.infer<typeof MappingValidation>[]

export type FindIsinRequest = {
  isin: string
  micCode?: string
}

/**
 * Return all associated figis
 */
export async function findIsin(req: FindIsinRequest): Promise<FindIsinResponse> {
  const client = new Client()
  const res = await client.post({
    path: "/v3/mapping",
    body: [
      {
        idType: "ID_ISIN",
        idValue: req.isin,
        micCode: req.micCode,
      },
    ],
  })
  const parsed = MappingResponse.parse(res)
  return parsed[0].data
}
