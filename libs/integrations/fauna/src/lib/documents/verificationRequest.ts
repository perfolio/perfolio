import { Document } from "./document"
import { z } from "zod"

export class VerificationRequest extends Document<z.infer<typeof VerificationRequest.schema>> {
  public static readonly collection = "verification_requests"
  public static readonly index = {
    byToken: "verification_request_by_token_and_identifier",
  }

  public static readonly schema = z.object({
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
  })
}
