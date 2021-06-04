import { Expr } from "faunadb"

export abstract class Document<T> {
  public readonly id: string
  public readonly ts: number
  public readonly data: T

  private readonly ref: Expr

  constructor(res: { ref: Expr; ts: number; data: T }) {
    this.ref = res.ref
    this.id = this.extractId(res.ref)
    this.ts = res.ts
    this.data = res.data
  }

  private extractId(ref: Expr): string {
    return Object.values(ref)[0].id
  }
}
