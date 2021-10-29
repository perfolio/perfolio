import { HttpError, JsonUnmarshalError } from "@perfolio/pkg/util/errors"
export type Interval = "daily" | "monthly" | "annual"

export const RF_IDENTIFIER_MAP: Record<Interval, string> = {
  daily: "EON/D.EONIA_TO.RATE",
  monthly: "FM/M.U2.EUR.RT.MM.EURIBOR1MD_.HSTA",
  annual: "FM/M.U2.EUR.RT.MM.EURIBOR1MD_.HSTA",
}

export type RiskFreeRates = Record<string, number>

export async function getRiskFreeRates(interval: Interval): Promise<RiskFreeRates> {
  const identifier = RF_IDENTIFIER_MAP[interval]

  const url = `https://sdw-wsrest.ecb.europa.eu/service/data/${identifier}`
  const res = await fetch(url)
  if (res.status !== 200) {
    throw new HttpError(res.status, url)
  }

  const data = (await res.json().catch((err) => {
    throw new JsonUnmarshalError(err)
  })) as {
    dataSets: {
      series: {
        [k in "0:0:0" | "0:0:0:0:0:0:0"]: { observations: [number][] }
      }
    }[]
    structure: {
      dimensions: {
        observation: {
          values: { id: string }[]
        }[]
      }
    }
  }

  const series: number[] = Object.values(
    data.dataSets[0]!.series[identifier === "daily" ? "0:0:0" : "0:0:0:0:0:0:0"].observations.map(
      (o) => o[0],
    ),
  )
  const timestamps = data.structure.dimensions.observation[0]!.values.map((v) => v.id)

  const riskFreeRates: Record<string, number> = {}

  const denominator: Record<Interval, number> = {
    daily: 360,
    monthly: 12,
    annual: 1,
  }

  for (let i = 0; i < series.length; i++) {
    riskFreeRates[timestamps[i]!]! = series[i]! / 100 / denominator[interval]
  }
  return riskFreeRates
}
