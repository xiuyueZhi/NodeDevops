// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwtAuth from '../../../app/middleware/JwtAuth';
import ExportErrorHandleError from '../../../app/middleware/error/HandleError';

declare module 'egg' {
  interface IMiddleware {
    jwtAuth: typeof ExportJwtAuth;
    error: {
      handleError: typeof ExportErrorHandleError;
    }
  }
}
