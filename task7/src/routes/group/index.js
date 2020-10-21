import { Router } from 'express';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';

import {
    getGroupById,
    deleteGroupById,
    getAllGroups,
    createGroup,
    updateGroup
} from '../../controllers/groupController';

const router = Router();

router
    .route('/:id')
    .get(loggerMiddleware, getGroupById)
    .delete(loggerMiddleware, deleteGroupById);
router
    .route('/')
    .get(loggerMiddleware, getAllGroups)
    .post(loggerMiddleware, createGroup)
    .put(loggerMiddleware, updateGroup);

export default router;
