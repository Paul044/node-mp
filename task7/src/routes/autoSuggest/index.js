import { Router } from 'express';
import validators from './validators';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import { getAutoSuggestedUsers } from '../../controllers/autoSuggestController';

const router = Router();

router.get(
    '/getAutoSuggestUsers',
    validators.getAutoSuggestUsersQuery,
    loggerMiddleware,
    getAutoSuggestedUsers
);

export default router;
