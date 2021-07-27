/**
 * Convert a string like "30s" or "1d" to seconds
 */
export function convertTime(ttl: string): number {
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
  return intervals[time] * multiplier
}
