export type FormatOptions = {
  fractionDigits?: number
  prefix?: string
  suffix?: string
  /**
   * Multiply by 100
   */
  percent?: boolean

  /**
   * Add a plus sign when positive
   */
  sign?: boolean
}

export function format(n: number, opts?: FormatOptions,): string {
  n ??= 0
  if (opts?.percent) {
    n *= 100
  }
  const s = n.toLocaleString(undefined, {
    minimumFractionDigits: opts?.fractionDigits ?? 2,
    maximumFractionDigits: opts?.fractionDigits ?? 2,
  },)

  return `${opts?.sign && n > 0 ? "+" : ""}${opts?.prefix ?? ""}${s}${opts?.suffix ?? ""}`
}
