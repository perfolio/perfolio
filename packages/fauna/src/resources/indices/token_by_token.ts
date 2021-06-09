import {CreateIndex, Collection} from "faunadb"
import {Token} from "@perfolio/fauna"
export default CreateIndex({
  name: Token.index.byToken,
  source: Collection(Token.collection),
  terms: [
    {
      field: ["data", "token"],
    },
  ],
  unique: true,
  serialized: true,
})
