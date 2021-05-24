import { Cloud } from "./cloud"
import { Time } from "pkg/time"

import dotenv from "dotenv"
dotenv.config()

let api: Cloud
beforeEach(() => {
  api = new Cloud({
    baseURL: "https://sandbox.iexapis.com/stable",
    token: process.env["IEX_SANDBOX_TOKEN"],
  })
})

describe("constructor", () => {
  describe("with token from config", () => {
    it("should not throw", () => {
      expect(() => {
        new Cloud({ token: "hello" })
      }).not.toThrow()
    })
  })
  describe("with empty token from config", () => {
    it("should throw", () => {
      process.env["IEX_TOKEN"] = ""
      expect(() => {
        new Cloud({ token: "" })
      }).toThrowErrorMatchingInlineSnapshot(`"Token must not be empty"`)
    })
  })
  describe("without token", () => {
    it("should throw", () => {
      process.env["IEX_TOKEN"] = ""
      expect(() => {
        new Cloud()
      }).toThrowErrorMatchingInlineSnapshot(`"Token must not be empty"`)
    })
  })
})

describe("getCompany()", () => {
  describe("when used with a valid symbol", () => {
    it("returns the correct company", async () => {
      const company = await api.getCompany("msft")
      expect(company.name).toBe("Microsoft Corporation")
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(
        api.getCompany("NOTHING"),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to load company from iex cloud: Error: Axios encountered: Error: Request failed with status code 404"`,
      )
    })
  })
})

describe("getClosingPrice()", () => {
  describe("when used with a valid symbol and time", () => {
    const testCases = [
      {
        name: "with lower case symbol",
        symbol: "msft",
      },
      {
        name: "with upper case symbol",
        symbol: "msft",
      },
    ]
    testCases.forEach((tc) => {
      describe(tc.name, () => {
        it("returns the correct price", async () => {
          const price = await api.getClosingPrice(
            tc.symbol,
            new Time(2020, 5, 11),
          )
          expect(price.value).toBeGreaterThan(0)
        })
      })
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(
        api.getClosingPrice("NOTHING", new Time(2020, 5, 11)),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to load closing price from iex cloud: Error: Axios encountered: Error: Request failed with status code 404"`,
      )
    })
  })
  describe("when used with an invalid time", () => {
    it("should return -1", async () => {
      const price = await api.getClosingPrice("msft", new Time(5000, 5, 11))

      expect(price.value).toBe(-1)
    })
  })
})

describe("getCurrentValue()", () => {
  describe("when used with a valid symbol and time", () => {
    const testCases = [
      {
        name: "with lower case symbol",
        symbol: "msft",
      },
      {
        name: "with upper case symbol",
        symbol: "msft",
      },
    ]
    testCases.forEach((tc) => {
      describe(tc.name, () => {
        it("returns the correct value", async () => {
          const value = await api.getCurrentValue(tc.symbol)
          expect(value).toBeGreaterThan(0)
        })
      })
    })
  })
  describe("when used with an invalid symbol", () => {
    it("should throw", async () => {
      await expect(
        api.getCurrentValue("NOTHING"),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to load latest price from iex: [ Error: Axios encountered: Error: Request failed with status code 404 ]"`,
      )
    })
  })
})
describe("getIsin()", () => {
  describe("when used with a valid isin", () => {
    it("returns the correct isin map", async () => {
      const map = await api.getIsin("US5949181045")
      expect(map.isin).toBe("US5949181045")
      expect(map.symbol).toBe("MSFT")
      expect(map.region).toBe("US")
    })
  })
})
