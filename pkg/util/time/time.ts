export class Time {
  public readonly day: number
  public readonly month: number
  public readonly year: number

  constructor(year: number, month: number, day: number) {
    this.day = day
    this.month = month
    this.year = year
  }
  /**
   * Returns a unix timestamp with second precission.
   */
  public unix(): number {
    return Math.floor(this.toDate().getTime() / 1000)
  }
  public static fromDate(d: Date): Time {
    return new Time(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate())
  }
  public toDate(): Date {
    const padded = this.pad()
    return new Date(`${padded.year}-${padded.month}-${padded.day}T00:00:00+0000`)
  }
  /**
   * From unix timestamp with second precision.
   */
  public static fromTimestamp(n: number): Time {
    return Time.fromDate(new Date(n * 1000))
  }

  /**
   * Semantic sugar to create a Time instance from a string.
   * The string must be parsable by `new Date(...)`
   */
  public static fromString(s: string): Time {
    return Time.fromDate(new Date(s))
  }

  /**.
   * Pads times with leading zeros
   *
   * @returns 2020 01 05
   */
  public pad(): { year: string; month: string; day: string } {
    return {
      year: this.year.toString().padStart(4, "0"),
      month: this.month.toString().padStart(2, "0"),
      day: this.day.toString().padStart(2, "0"),
    }
  }
  /**
   * Return a new Time instance where 1 day has been added.
   */
  public nextDay(): Time {
    return Time.fromTimestamp(Math.floor(this.toDate().getTime() / 1000) + 24 * 60 * 60)
  }

  public toString(): string {
    const padded = this.pad()
    return `${padded.day}-${padded.month}-${padded.year}`
  }
  /**
   * Create a new Time instance initialized to the time right now.
   */
  public static today(): Time {
    return Time.fromDate(new Date())
  }

  /**
   * Check if two times are equal.
   */
  public equals(other: Time): boolean {
    return this.day === other.day && this.month === other.month && this.year === other.year
  }

  public toJson(): number {
    return this.unix()
  }

  /**
   * Print a human readabe time difference
   * @param unix - Second precision
   */
  public static ago(unix: number): string {
    const SECOND = 1
    const MINUTE = 60 * SECOND
    const HOUR = 60 * MINUTE
    const DAY = 24 * HOUR
    const YEAR = 365 * DAY

    const diff = Date.now() / 1000 - unix
    if (diff < MINUTE) {
      return `${diff.toFixed(0)}s ago`
    } else if (diff < HOUR) {
      return `${(diff / MINUTE).toFixed(0)} minutes ago`
    } else if (diff < DAY) {
      return `${(diff / HOUR).toFixed(0)} hours ago`
    } else if (diff < YEAR) {
      return `${(diff / DAY).toFixed(0)} days ago`
    } else {
      return `${(diff / YEAR).toFixed()} years ago`
    }
  }

  /**
   * Convert a string like "30s" or "1d" to seconds
   *
   * @param ms - Convert to milliseconds instead
   */
  public static toSeconds(ttl: string, opts?: { ms?: boolean }): number {
    const parsed = RegExp(/^(\d+)([smhd]{1})$/).exec(ttl)
    if (!parsed || !parsed[1] || !parsed[2]) {
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

    const interval = intervals[time]
    if (typeof interval === "undefined") {
      throw new Error(`${time} is not in interval`)
    }
    return interval * multiplier * (opts?.ms ? 1000 : 1)
  }
}
