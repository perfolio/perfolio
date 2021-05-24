import { Cache } from "./cache"
import { PrismaClient, Prisma, Company } from "@prisma/client"
import { Time } from "pkg/time"
const prisma = new PrismaClient()
const cache = new Cache()
afterAll(async (done) => {
  await cache.close()

  await prisma.$disconnect()
  done()
})

beforeEach(async () => {
  await prisma.company.deleteMany()
  await prisma.isin.deleteMany()
  await prisma.price.deleteMany()
})

describe("companies", () => {
  const seedCompany = {
    address: "Some street",
    ceo: "my self",
    city: "Nürnberg",
    name: "perfolio",
    country: "germany",
    description: "A really cool company",
    employees: 4,
    exchange: "NYC",
    industry: "fintech",
    logo: "url-goes.here",
    phone: "0123456789",
    sector: "information",
    state: "bavaria",
    symbol: "prfl",
    website: "perfol.io",
  } as Company

  describe("setCompany()", () => {
    describe("when company does not exist yet", () => {
      it("saves a new company in the database", async () => {
        const err = await cache.setCompany(seedCompany)
        expect(err).toBeNull
        const savedCompany = await prisma.company.findFirst({
          where: { symbol: seedCompany.symbol },
        })
        expect(savedCompany.address).toEqual(seedCompany.address)
        expect(savedCompany.address2).toBeNull()
        expect(savedCompany.ceo).toEqual(seedCompany.ceo)
        expect(savedCompany.city).toEqual(seedCompany.city)
        expect(savedCompany.name).toEqual(seedCompany.name)
        expect(savedCompany.country).toEqual(seedCompany.country)
        expect(savedCompany.createdAt).not.toBeNull()
        expect(savedCompany.description).toEqual(seedCompany.description)
        expect(savedCompany.employees).toEqual(seedCompany.employees)
        expect(savedCompany.exchange).toEqual(seedCompany.exchange)
        expect(savedCompany.id).not.toBeNull()
        expect(savedCompany.industry).toEqual(seedCompany.industry)
        expect(savedCompany.issueType).toBeNull()
        expect(savedCompany.logo).toEqual(seedCompany.logo)
        expect(savedCompany.phone).toEqual(seedCompany.phone)
        expect(savedCompany.primarySICCode).toBeNull()
        expect(savedCompany.sector).toEqual(seedCompany.sector)
        expect(savedCompany.securityName).toBeNull()
        expect(savedCompany.state).toEqual(seedCompany.state)
        expect(savedCompany.symbol).toEqual(seedCompany.symbol)
        expect(savedCompany.updatedAt).not.toBeNull()
        expect(savedCompany.website).toEqual(seedCompany.website)
        expect(savedCompany.zip).toBeNull()
      })
    })
    describe("when a company with the same symbol already exists", () => {
      it("updates the company", async () => {
        await cache.setCompany(seedCompany)
        const savedCompany1 = await prisma.company.findMany({
          where: { symbol: seedCompany.symbol },
        })
        expect(savedCompany1.length).toBe(1)
        expect(savedCompany1[0].employees).toBe(4)

        seedCompany.employees = 5
        await cache.setCompany(seedCompany)

        const savedCompany2 = await prisma.company.findMany({
          where: { symbol: seedCompany.symbol },
        })
        expect(savedCompany2.length).toBe(1)
        expect(savedCompany2[0].employees).toBe(5)

        expect(
          savedCompany2[0].updatedAt.getTime() -
            savedCompany1[0].updatedAt.getTime(),
        ).toBeGreaterThan(0)
      })
    })
  })
  describe("getCompany", () => {
    describe("when company exists", () => {
      it("returns the found company", async () => {
        await prisma.company.create({ data: seedCompany })
        const company = await cache.getCompany("prfl")
        expect(company.name).toBe("perfolio")
      })
    })
    describe("when company does not exist", () => {
      it("returns a miss and no error", async () => {
        const company = await cache.getCompany("xxxxxxxxxxx")
        expect(company).toBeNull()
      })
    })
  })
})

describe("prices", () => {
  describe("setPrice()", () => {
    describe("when price does not exist yet", () => {
      it("saves a new price in the database", async () => {
        const price: Prisma.PriceCreateInput = {
          symbol: "aapl",
          value: 1.0,
          time: new Date(),
        }
        await cache.setPrices([price])
        const savedPrice = await prisma.price.findFirst({
          where: { symbol: price.symbol, time: price.time },
        })
        expect(savedPrice.createdAt).not.toBeNull()
        expect(savedPrice.id).not.toBeNull()
        expect(savedPrice.symbol).toEqual(price.symbol)
        expect(savedPrice.updatedAt).not.toBeNull()
        expect(savedPrice.value).toBe(1)
      })
    })
    describe("when a price with the same symbol and time already exists", () => {
      it("updates the price", async () => {
        const price = {
          symbol: "msft",
          time: new Date(),
          value: 1,
        }

        await cache.setPrices([price])
        const savedPrices1 = await prisma.price.findMany({
          where: { symbol: price.symbol, time: price.time },
        })
        expect(savedPrices1.length).toBe(1)
        expect(savedPrices1[0].value).toBe(1)

        price.value = 2
        await cache.setPrices([price])

        const savedPrices2 = await prisma.price.findMany({
          where: { symbol: price.symbol, time: price.time },
        })
        expect(savedPrices2.length).toBe(1)
        expect(savedPrices2[0].value).toBe(2)

        expect(
          savedPrices2[0].updatedAt.getTime() -
            savedPrices1[0].updatedAt.getTime(),
        ).toBeGreaterThan(0)
      })
    })
  })
  describe("getPrice", () => {
    describe("when price exists", () => {
      it("returns the found price", async () => {
        const newPrice = {
          symbol: "tsla",
          time: Time.today().toDate(),
          value: 1,
        }
        await prisma.price.create({ data: newPrice })
        const savedPrice = await cache.getPrice(
          newPrice.symbol,
          Time.fromDate(newPrice.time),
        )
        expect(savedPrice.value).toBe(1)
      })
    })
    describe("when price does not exist", () => {
      it("returns a miss and no error", async () => {
        const price = await cache.getPrice("tsla", Time.today())
        expect(price).toBeNull()
      })
    })
  })
})

describe("symbol", () => {
  describe("setIsinMap()", () => {
    describe("when isinMap does not exist yet", () => {
      it("saves a new isinMap in the database", async () => {
        const isinMap: Prisma.IsinCreateInput = {
          symbol: "aapl",
          isin: "US0378331005",
          region: "region",
          exchange: "somewhere",
        }
        await cache.setIsinMap(isinMap)
        const savedIsinMap = await prisma.isin.findUnique({
          where: { isin: isinMap.isin },
        })
        expect(savedIsinMap.createdAt).not.toBeNull()
        expect(savedIsinMap.id).not.toBeNull()
        expect(savedIsinMap.symbol).toEqual(isinMap.symbol)
        expect(savedIsinMap.updatedAt).not.toBeNull()
      })
    })
    describe("when an isinMap with the same isin and symbol already exists", () => {
      it("updates the isinMap", async () => {
        const isinMap: Prisma.IsinCreateInput = {
          symbol: "msft",
          region: "region",
          exchange: "somewhere",
          isin: "US5949181045",
        }

        await cache.setIsinMap(isinMap)

        const savedIsinMap1 = await prisma.isin.findMany({
          where: { isin: isinMap.isin },
        })
        expect(savedIsinMap1.length).toBe(1)
        expect(savedIsinMap1[0].symbol).toBe(isinMap.symbol)
        expect(savedIsinMap1[0].region).toBe(isinMap.region)

        isinMap.region = "I moved somewhere"
        await cache.setIsinMap(isinMap)

        const savedIsinMap2 = await prisma.isin.findMany({
          where: { isin: isinMap.isin },
        })
        expect(savedIsinMap2.length).toBe(1)
        expect(savedIsinMap2[0].symbol).toBe(isinMap.symbol)
        expect(savedIsinMap2[0].region).toBe(isinMap.region)

        expect(
          savedIsinMap2[0].updatedAt.getTime() -
            savedIsinMap1[0].updatedAt.getTime(),
        ).toBeGreaterThan(0)
      })
    })
  })
  describe("getSymbol", () => {
    describe("when isinMap exists", () => {
      it("returns the found symbol", async () => {
        const newIsin = {
          symbol: "hello world",
          isin: "unique",
          exchange: "abc",
          region: "region",
        }
        await prisma.isin.create({ data: newIsin })
        const symbol = await cache.getSymbol(newIsin.isin)

        expect(symbol).toBe(newIsin.symbol)
      })
    })
    describe("when isinMap does not exist", () => {
      it("returns a miss and no error", async () => {
        const symbol = await cache.getSymbol("I do not exist")
        expect(symbol).toBeNull()
      })
    })
  })
})
