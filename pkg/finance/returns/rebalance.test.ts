import { assetsOvertime, index as want, } from "./fixtures"
import { rebalance, } from "./rebalance"
it("calculates the index correctly", () => {
  const index = rebalance(assetsOvertime,)
  Object.keys(want,).forEach((time,) => {
    expect(index[Number(time,)],).toBeCloseTo(index[Number(time,)], 4,)
  },)
})
