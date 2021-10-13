import { env } from "@chronark/env"
import { createHash } from "crypto"

export class Key {
  public readonly parameters?: Record<string, unknown>
  public readonly environment: string
  public readonly version = "v2"

  constructor(parameters?: Record<string, unknown>) {
    this.parameters = parameters
    /**
     * Sometimes during development I fill the cache with "bad" data
     */
    this.environment = env.get("VERCEL_ENV") ?? env.get("NODE_ENV") ?? "development"
  }

  public toString(): string {
    return createHash("md5")
      .update(
        JSON.stringify({
          parameters: this.parameters,
          environment: this.environment,
          version: this.version,
        }),
      )
      .digest("hex")
  }
}

export type Value =
  | Record<number, unknown>
  | Record<string, unknown>
  | number
  | unknown[]
  | null
  | string
