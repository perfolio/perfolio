import { Collection, CreateIndex } from 'faunadb';
import { Symbol } from '../../lib/documents/symbol';

export default CreateIndex({
  name: Symbol.index.byIsin,
  source: Collection(Symbol.collection),
  terms: [
    {
      field: ['data', 'isin'],
    },
  ],
  unique: true,
  serialized: true,
});
