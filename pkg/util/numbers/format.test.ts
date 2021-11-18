import { format, FormatOptions, } from "./format"

describe("format", () => {
  const testCases: { name: string; n: number; opts: FormatOptions; want: string }[] = [
    {
      name: "adds the correct number of float digits to an integer",
      n: 1_000,
      opts: { fractionDigits: 4, },
      want: "1,000.0000",
    },
    {
      name: "removes all float digits",
      n: 1.00001341,
      opts: { fractionDigits: 0, },
      want: "1",
    },
    {
      name: "adds a prefix",
      n: 1_000,
      opts: { prefix: "$", },
      want: "$1,000.00",
    },
    {
      name: "adds a suffix",
      n: 1_000,
      opts: { suffix: "€", },
      want: "1,000.00€",
    },
    {
      name: "adds a prefix and suffix",
      n: 1_000,
      opts: { prefix: "$", suffix: "€", },
      want: "$1,000.00€",
    },
    {
      name: "calculates percent",
      n: 0.51251,
      opts: { percent: true, suffix: "%", },
      want: "51.25%",
    },
  ]

  testCases.forEach((tc,) => {
    it(tc.name, () => {
      expect(format(tc.n, tc.opts,),).toEqual(tc.want,)
    },)
  },)
})
