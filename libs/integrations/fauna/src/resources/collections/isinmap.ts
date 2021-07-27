import { CreateCollection } from "faunadb"
import { IsinMap } from "../../lib/documents/isin-map"
export default CreateCollection({ name: IsinMap.collection })
