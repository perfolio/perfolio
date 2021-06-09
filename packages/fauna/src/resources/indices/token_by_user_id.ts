import {CreateIndex, Collection} from "faunadb"
import {Token} from "@perfolio/fauna"
export default CreateIndex({
  name: Token.index.byUserId,
  source: Collection(Token.collection),
  terms: [
    {
      field: ["data", "userId"],
    },
  ],
  unique: false,
  serialized: true,
})
