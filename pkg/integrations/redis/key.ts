import { env, } from "@chronark/env"
import { createHash, } from "crypto"
export class Key {
  public readonly parameters: string[] = []
  public readonly environment: string
  public readonly version = "v2"

  constructor(
    ...parameters: (
      | Record<string, number | string | boolean | unknown | undefined>
      | string
      | undefined
      | number
    )[]
  ) {
    for (const p of parameters) {
      switch (typeof p) {
        case "undefined":
          continue
        case "string":
          this.parameters.push(p,)
          break
        case "boolean":
        case "number":
          this.parameters.push(p.toString(),)
          break

        case "object":
          for (const [k, v,] of Object.entries(p,)) {
            switch (typeof v) {
              case "object":
                this.parameters.push(
                  createHash("md5",).update(JSON.stringify({ k, v, },),).digest("hex",),
                )
                break
              case "string":
                this.parameters.push([k, v,].join(":",),)
                break
              case "number":
              case "boolean":
                this.parameters.push([k, v.toString(),].join(":",),)
                break

              default:
                break
            }

            if (typeof v !== "undefined") {
              parameters.push([k, v,].join(":",),)
            }
          }

          break
        default:
          throw new Error(`keys of type ${typeof p} can not be serialized`,)
      }
    }
    /**
     * Sometimes during development I fill the cache with "bad" data
     */
    this.environment = env.get("VERCEL_ENV",) ?? env.get("NODE_ENV",) ?? "development"
  }

  public toString(): string {
    return [this.environment, this.version, ...this.parameters,].join(":",)
  }
}

export type Value =
  | Record<number, unknown>
  | Record<string, unknown>
  | number
  | unknown[]
  | null
  | string
