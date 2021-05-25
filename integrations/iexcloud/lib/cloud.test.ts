import { Cloud } from "./cloud"
import { Time } from "pkg/time"
import nodeFetch from "node-fetch"
import dotenv from "dotenv"

/**
 * Nextjs polyfills fetch automatically but jest does not.
 */
window.fetch = nodeFetch

dotenv.config()

let api: Cloud
beforeEach(() => {
  api = new Cloud({
    baseUrl: "https://sandbox.iexapis.com/stable",
    token: process.env["IEX_SANDBOX_TOKEN"],
  })
})

describe("getCompany()", () => {
  describe("when used with a valid symbol", () => {
    it("returns the correct company", async () => {
      const company = await api.getCompany({ symbol: "msft" })
      expect(company.companyName).toBe("Microsoft Corporation")
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(
        api.getCompany({ symbol: "NOTHING" }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to GET endpoint /stock/nothing/company, failed with status: 404"`,
      )
    })
  })
})

describe("getLogo()", () => {
  describe("when used with a valid symbol", () => {
    it("returns the correct logo", async () => {
      const { url } = await api.getLogo({ symbol: "msft" })
      /**
       * IEX Sandbox image urls always seem to have length 66.
       */
      expect(url).toHaveLength(66)
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(api.getLogo({ symbol: "NOTHING" })).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to GET endpoint /stock/nothing/logo, failed with status: 404"`,
      )
    })
  })
})
describe("getPrice()", () => {
  describe("when used with a valid symbol and time", () => {
    const time = new Time(2020, 5, 11)
    const testCases = [
      {
        name: "with lower case symbol",
        symbol: "msft",
      },
      {
        name: "with upper case symbol",
        symbol: "MSFT",
      },
    ]
    testCases.forEach((tc) => {
      describe(`with ${tc.symbol} on ${time}`, () => {
        it("returns the correct price", async () => {
          const price = await api.getPrice({
            symbol: tc.symbol,
            time,
          })
          expect(price.value).toBeGreaterThan(0)
        })
      })
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(
        api.getPrice({ symbol: "NOTHING", time: new Time(2020, 5, 11) }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to GET endpoint /stock/nothing/chart/date/20200511, failed with status: 404"`,
      )
    })
  })
  describe("when used with an invalid time", () => {
    it("should return -1", async () => {
      const price = await api.getPrice({
        symbol: "msft",
        time: new Time(5000, 5, 11),
      })
      expect(price.value).toBe(-1)
    })
  })
})

// describe("getCurrentValue()", () => {
//   describe("when used with a valid symbol and time", () => {
//     const testCases = [
//       {
//         name: "with lower case symbol",
//         symbol: "msft",
//       },
//       {
//         name: "with upper case symbol",
//         symbol: "msft",
//       },
//     ]
//     testCases.forEach((tc) => {
//       describe(tc.name, () => {
//         it("returns the correct value", async () => {
//           const value = await api.getCurrentValue(tc.symbol)
//           expect(value).toBeGreaterThan(0)
//         })
//       })
//     })
//   })
//   describe("when used with an invalid symbol", () => {
//     it("should throw", async () => {
//       await expect(
//         api.getCurrentValue("NOTHING"),
//       ).rejects.toThrowErrorMatchingInlineSnapshot(
//         `"Unable to load latest price from iex: [ Error: Axios encountered: Error: Request failed with status code 404 ]"`,
//       )
//     })
//   })
// })
// describe("getIsin()", () => {
//   describe("when used with a valid isin", () => {
//     it("returns the correct isin map", async () => {
//       const map = await api.getIsin("US5949181045")
//       expect(map.isin).toBe("US5949181045")
//       expect(map.symbol).toBe("MSFT")
//       expect(map.region).toBe("US")
//     })
//   })
// })
