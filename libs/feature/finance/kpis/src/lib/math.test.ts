import { average, standardDeviation } from "./math"
describe("average", () => {
  it("works with a single element", () => {
    expect(average([1])).toBe(1)
  })

  it("works with multiple elements", () => {
    expect(average([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5)
  })
})
describe("standardDeviation", () => {
  it("calculates the correct std", () => {
    expect(standardDeviation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(0.26885326206904914)
  })
})
