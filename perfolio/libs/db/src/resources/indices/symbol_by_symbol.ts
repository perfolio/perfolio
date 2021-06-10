import { Collection, CreateIndex } from 'faunadb';
import { Symbol } from '../../lib/documents/symbol';

export default CreateIndex({
  name: Symbol.index.bySymbol,
  source: Collection(Symbol.collection),
  terms: [
    {
      field: ['data', 'symbol'],
    },
  ],
  unique: true,
  serialized: true,
});
