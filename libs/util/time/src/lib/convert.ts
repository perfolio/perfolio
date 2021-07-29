/**
 * Convert a string like "30s" or "1d" to seconds
 *
 * @param ms - Convert to milliseconds instead
 */
export function convertTime(ttl: string, opts?: { ms?: boolean }): number {
  const parsed = RegExp(/^(\d+)([smhd]{1})$/).exec(ttl)
  if (!parsed) {
    throw new Error(`Unable to parse ttl`)
  }

  const multiplier = parseInt(parsed[1])
  const time = parsed[2]

  const intervals: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  }
  return intervals[time] * multiplier * (opts?.ms ? 1000 : 1)
}
