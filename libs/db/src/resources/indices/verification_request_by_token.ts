import { Collection, CreateIndex } from "faunadb"

export default CreateIndex({
  name: "verification_request_by_token",
  source: Collection("verification_requests"),
  unique: true,
  terms: [{ field: ["data", "token"] }, { field: ["data", "identifier"] }],
})
