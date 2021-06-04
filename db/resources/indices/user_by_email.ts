import { Collection, CreateIndex } from "faunadb"
import { COLLECTION_USERS } from "../collections/users"
export const INDEX_USER_BY_EMAIL = "user_by_email"

export default CreateIndex({
  name: INDEX_USER_BY_EMAIL,
  source: Collection(COLLECTION_USERS),
  terms: [
    {
      field: ["data", "email"],
    },
  ],
  unique: true,
  serialized: true,
})
