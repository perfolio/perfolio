import { CreateCollection } from "faunadb"
import { VerificationRequest } from "../../lib/documents/verificationRequest"
export default CreateCollection({ name: VerificationRequest.collection, ttl_days: 30 })
