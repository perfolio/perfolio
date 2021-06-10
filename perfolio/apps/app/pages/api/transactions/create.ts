import {
  withMiddleware,
  createTransactionApiHandler,
  CreateTransactionRequestValidation,
} from '@perfolio/api';

export default withMiddleware(createTransactionApiHandler, CreateTransactionRequestValidation);
