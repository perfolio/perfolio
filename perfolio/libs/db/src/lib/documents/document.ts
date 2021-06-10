import { Expr } from 'faunadb';

export abstract class Document<T> {
  public readonly id: string;
  public readonly ts: number;
  public readonly data: T;

  private readonly ref: Expr;

  constructor(data: { ref: Expr; ts: number; data: T }) {
    this.ref = data.ref;
    this.id = this.extractId(data.ref);
    this.ts = data.ts;
    this.data = data.data;
  }

  private extractId(ref: Expr): string {
    return Object.values(ref)[0].id;
  }
}
