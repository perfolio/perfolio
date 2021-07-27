import { env } from "@perfolio/util/env"

export class Key {
  public readonly parameters?: Record<string, unknown>
  public readonly environment: string

  constructor(parameters?: Record<string, unknown>) {
    this.parameters = parameters
    /**
     * Sometimes during development I fill the cache with "bad" data
     */
    this.environment = env.get("VERCEL_ENV") ?? env.get("NODE_ENV") ?? "development"
  }

  public toString(): string {
    return JSON.stringify({
      parameters: this.parameters,
      environment: this.environment,
    })
  }
}

export type Value =
  | Record<number, unknown>
  | Record<string, unknown>
  | number
  | unknown[]
  | null
  | string
