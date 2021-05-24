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
   * Returns a unix timestamp with nanosecond precission.
   */
  public unix(): number {
    return this.toDate().getTime()
  }
  public static fromDate(d: Date): Time {
    return new Time(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate())
  }
  public toDate(): Date {
    const padded = this.pad()
    return new Date(
      `${padded.year}-${padded.month}-${padded.day}T00:00:00+0000`,
    )
  }
  public static fromTimestamp(n: number): Time {
    return Time.fromDate(new Date(n))
  }

  public pad(): { year: string; month: string; day: string } {
    return {
      year: this.year.toString().padStart(4, "0"),
      month: this.month.toString().padStart(2, "0"),
      day: this.day.toString().padStart(2, "0"),
    }
  }

  public nextDay(): Time {
    return Time.fromTimestamp(this.toDate().getTime() + 24 * 60 * 60 * 1000)
  }

  public toString(): string {
    const padded = this.pad()
    return `${padded.day}-${padded.month}-${padded.year}`
  }
  public static today(): Time {
    return Time.fromDate(new Date())
  }
  public equals(other: Time): boolean {
    return (
      this.day === other.day &&
      this.month === other.month &&
      this.year === other.year
    )
  }
}
