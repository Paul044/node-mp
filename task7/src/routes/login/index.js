import { Router } from 'express';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import validators from './validators';
import { retrieveJwtToken } from '../../controllers/loginController';

const router = Router();

router.route('/').post(validators.login, loggerMiddleware, retrieveJwtToken);

export default router;
