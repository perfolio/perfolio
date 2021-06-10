import { Collection, CreateIndex } from 'faunadb';
import { Transaction } from '../../lib/documents/transaction';

export default CreateIndex({
  name: Transaction.index.byUserId,
  source: Collection(Transaction.collection),
  terms: [
    {
      field: ['data', 'userId'],
    },
  ],
  unique: false,
  serialized: true,
});
