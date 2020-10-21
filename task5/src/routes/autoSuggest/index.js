import express from 'express';

import validators from './validators';
import UserService from '../../services/userService';
import db from '../../models';

import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import { populateErrorWithHadledFields } from '../../utils/errorHandler';

const userService = new UserService(db);
const router = express.Router();

router.get(
    '/getAutoSuggestUsers',
    validators.getAutoSuggestUsersQuery,
    loggerMiddleware,
    async (req, res, next) => {
        try {
            const { limit, loginSubstring } = req.query;
            const data = await userService.getFilteredSliceOfUsers(
                limit,
                loginSubstring
            );
            res.json(data);
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    }
);

export default router;
