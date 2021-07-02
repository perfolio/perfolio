import { getAbsoluteDifferences, getRelativeDifferences } from "./util"
import { average } from "./math"
export class Mean {
  public static getAbsolute(values: number[]): number {
    if (values.length < 2) {
      return 0
    }
    return average(getAbsoluteDifferences(values))
  }

  public static getRelative(values: number[]): number {
    if (values.length < 2) {
      return 0
    }
    return average(getRelativeDifferences(values))
  }
}
