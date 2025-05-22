import helmet from 'helmet';
import { Express } from 'express';

export const configureSecurityMiddleware = (app: Express) => {
  app.use(helmet());
  app.disable('x-powered-by');
}; 