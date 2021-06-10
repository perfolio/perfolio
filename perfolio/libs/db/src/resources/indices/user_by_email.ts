import { Collection, CreateIndex } from 'faunadb';
import { User } from '../../lib/documents/user';

export default CreateIndex({
  name: User.index.byEmail,
  source: Collection(User.collection),
  terms: [
    {
      field: ['data', 'email'],
    },
  ],
  unique: true,
  serialized: true,
});
