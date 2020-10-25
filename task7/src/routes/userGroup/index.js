import { Router } from 'express';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import {
    getUserGroup,
    addUsersToGroup
} from '../../controllers/userGroupController';

const router = Router();

router.route('/').get(loggerMiddleware, getUserGroup);
router.route('/addUsersToGroup').post(loggerMiddleware, addUsersToGroup);

export default router;
