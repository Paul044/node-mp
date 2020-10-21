import { Router } from 'express';
import validators from './validators';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';

import {
    getUser,
    deleteUser,
    updateUser,
    createUser
} from '../../controllers/userController';

const router = Router();

router
    .route('/:id')
    .get(validators.uuid, loggerMiddleware, getUser)
    .delete(validators.uuid, loggerMiddleware, deleteUser);

router
    .route('/')
    .put(validators.userWithId, loggerMiddleware, updateUser)
    .post(validators.user, loggerMiddleware, createUser);

export default router;
