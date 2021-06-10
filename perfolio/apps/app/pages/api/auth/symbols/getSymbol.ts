import {
  withMiddleware,
  getSymbolApiHandler,
  GetSymbolRequestValidation,
} from '@perfolio/api';

export default withMiddleware(getSymbolApiHandler, GetSymbolRequestValidation);
