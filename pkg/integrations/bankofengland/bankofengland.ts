import { HttpError } from "@perfolio/util/errors"
export type Interval = "daily" | "monthly" | "annual"
export type Currency =
  | "EUR"
  | "JPY"
  | "GBP"
  | "CHF"
  | "RUB"
  | "AUD"
  | "BRL"
  | "CAD"
  | "CNY"
  | "INR"
  | "DKK"
  | "NZD"
  | "NOK"
  | "SEK"
  | "PLN"
  | "ILS"
  | "KRW"
  | "TRY"

const CURRENCY_IDENTIFIER_MAP: Record<Currency, Record<Interval, string>> = {
  EUR: { annual: "XUALERD", monthly: "XUMLERD", daily: "XUDLERD" },
  JPY: { annual: "XUALJYD", monthly: "XUMLJYD", daily: "XUDLJYD" },
  GBP: { annual: "XUALGBD", monthly: "XUMLGBD", daily: "XUDLGBD" },
  CHF: { annual: "XUALSFD", monthly: "XUMLSFD", daily: "XUDLSFD" },
  RUB: { annual: "XUALBK69", monthly: "XUMLBK69", daily: "XUDLBK69" },
  AUD: { annual: "XUALADD", monthly: "XUMLADD", daily: "XUDLADD" },
  BRL: { annual: "XUALB8KL", monthly: "XUMLB8KL", daily: "XUDLB8KL" },
  CAD: { annual: "XUALCDD", monthly: "XUMLCDD", daily: "XUDLCDD" },
  CNY: { annual: "XUALBK73", monthly: "XUMLBK73", daily: "XUDLBK73" },
  INR: { annual: "XUALBK64", monthly: "XUMLBK64", daily: "XUDLBK64" },
  DKK: { annual: "XUALDKD", monthly: "XUMLDKD", daily: "XUDLDKD" },
  NZD: { annual: "XUALNDD", monthly: "XUMLNDD", daily: "XUDLNDD" },
  NOK: { annual: "XUALNKD", monthly: "XUMLNKD", daily: "XUDLNKD" },
  SEK: { annual: "XUALSKD", monthly: "XUMLSKD", daily: "XUDLSKD" },
  PLN: { annual: "XUALBK49", monthly: "XUMLBK49", daily: "XUDLBK49" },
  ILS: { annual: "XUALBK65", monthly: "XUMLBK65", daily: "XUDLBK65" },
  KRW: { annual: "XUALBK74", monthly: "XUMLBK74", daily: "XUDLBK74" },
  TRY: { annual: "XUALBK75", monthly: "XUMLBK75", daily: "XUDLBK75" },
}
/**
 * The key is the date
 * the value is the fx rate in <YourCurrency> divided by USD
 */
export type FXRates = Record<string, number>

/***
 * The Bank of England Api only returns XML or CSV,
 * We chose the latter and have to parse the CSV manually.
 *
 * Each row except the header looks as follows:
 * ```
 * 13 Jan 2020, 0.12345
 * ```
 *
 * For monthly and annual requests the api returns only the last day of the
 * month or year respectively.
 * ```
 * 31 Dec 2020, 0.12345
 * ```
 *
 */
export async function getFXRates(interval: Interval, currency: Currency): Promise<FXRates> {
  const url = "http://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp"
  const params = {
    "csv.x": "yes",
    Datefrom: "01/jan/1963",
    Dateto: "now",
    SeriesCodes: CURRENCY_IDENTIFIER_MAP[currency][interval],
    UsingCodes: "Y",
  }
  const res = await fetch(
    `${url}?${Object.entries(params)
      .map(([key, val]) => `${key}=${val})`)
      .join("&")}`,
  )
  if (res.status !== 200) {
    throw new HttpError(res.status, url)
  }

  const data = await res.text()

  /**
   * Unit: SearchedCurrency / USD
   */
  const fxRates: FXRates = {}
  data
    .split("\n")
    .slice(1, -1)
    .map((s: string) => s.replace("\r", ""))
    .forEach((s: string) => {
      const [time, value] = s.split(",")
      const [, month, year] = time.split(" ")

      const date: Record<Interval, string> = {
        daily: time,
        monthly: [month, year].join(" "),
        annual: year,
      }
      fxRates[date[interval]] = parseFloat(value)
    })

  return fxRates
}
