import { Time } from "pkg/time"
import * as z from "zod"

export const CreateTransaction = z.object({
  assetId: z.string().nonempty(),
  quantity: z.number(),
  value: z.number().positive(),
  executedAt: z.number().max(Time.today().unix()),
})
