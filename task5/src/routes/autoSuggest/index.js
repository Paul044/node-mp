import express from 'express';

import validators from './validators';
import UserService from '../../services/userService';
import db from '../../models';

import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';

const userService = new UserService(db);
const router = express.Router();

router.get(
    '/getAutoSuggestUsers',
    validators.getAutoSuggestUsersQuery,
    loggerMiddleware,
    async (req, res) => {
        try {
            const { limit, loginSubstring } = req.query;
            const data = await userService.getFilteredSliceOfUsers(
                limit,
                loginSubstring
            );
            res.json(data);
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    }
);

export default router;
