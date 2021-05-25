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
}
