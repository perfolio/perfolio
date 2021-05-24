import { Time } from "./time"

describe("constructor()", () => {
  it("returns a new instance", () => {
    const time = new Time(2020, 1, 5)
    expect(time.toString()).toBe("05-01-2020")
  })
})

describe("nextDay()", () => {
  const testCases: {
    name: string
    day: [number, number, number]
    want: [number, number, number]
  }[] = [
    {
      name: "No edge case",
      day: [2020, 5, 5],
      want: [2020, 5, 6],
    },
    {
      name: "roll over to next month",
      day: [2000, 1, 31],
      want: [2000, 2, 1],
    },
    {
      name: "leap year",
      day: [2000, 2, 29],
      want: [2000, 3, 1],
    },
    {
      name: "roll over to next year",
      day: [2020, 12, 31],
      want: [2021, 1, 1],
    },
  ]

  for (const tc of testCases) {
    describe(tc.name, () => {
      it("returns the next day", () => {
        const time = new Time(...tc.day)
        const next = time.nextDay()
        expect(next.year).toBe(tc.want[0])
        expect(next.month).toBe(tc.want[1])
        expect(next.day).toBe(tc.want[2])
      })
    })
  }
})
