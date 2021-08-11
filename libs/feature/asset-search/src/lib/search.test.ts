import { search } from "./search"

const isinMap = [
  {
    isin: "US9814191048",
    ticker: "WRLD",
    name: "World Acceptance Corp.",
  },
  {
    isin: "US30231G1022",
    ticker: "XOM",
    name: "Exxon Mobil Corp.",
  },
  {
    isin: "US62944T1051",
    ticker: "NVR",
    name: "NVR Inc.",
  },
  {
    isin: "US7512121010",
    ticker: "RL",
    name: "Ralph Lauren Corp",
  },
  {
    isin: "US6501111073",
    ticker: "NYTAB",
    name: "The New York Times Co.",
  },
  {
    isin: "US0255371017",
    ticker: "AEP",
    name: "American Electric Power Company Inc.",
  },
  {
    isin: "US36164Y1010",
    ticker: "GCP",
    name: "GCP Applied Technologies Inc",
  },
]

const fakeGetTickerFromIsin = async (isin: string): Promise<string> => {
  switch (isin) {
    case "US1111111111":
      return Promise.resolve("SYMBOL1")
    case "DE2222222222":
      return Promise.resolve("SYMBOL2")
    default:
      throw new Error(`Exhausted dummy data`)
  }
}

describe("search()", () => {
  const testCases: {
    name: string
    fragment: string
    expected: { isin: string; ticker: string }[]
  }[] = [
    {
      name: "detects symbols and only returns one asset",
      fragment: "RL",
      expected: [{ ticker: "RL", isin: "US7512121010" }],
    },
    {
      name: "detects isins and only returns one asset",
      fragment: "US9814191048",
      expected: [{ ticker: "WRLD", isin: "US9814191048" }],
    },
    {
      name: "Fuzzymatches a fragment and returns the 5 best results",
      fragment: "Exxon",
      expected: [
        {
          isin: "US30231G1022",
          ticker: "XOM",
        },
        {
          isin: "US6501111073",
          ticker: "NYTAB",
        },
        {
          isin: "US62944T1051",
          ticker: "NVR",
        },
        {
          isin: "US0255371017",
          ticker: "AEP",
        },
        {
          isin: "US9814191048",
          ticker: "WRLD",
        },
      ],
    },
  ]

  testCases.forEach((tc) => {
    test(tc.name, async () => {
      const result = await search(tc.fragment, isinMap, fakeGetTickerFromIsin)
      expect(result).toEqual(tc.expected)
    })
  })
})
