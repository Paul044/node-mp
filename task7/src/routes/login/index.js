import express from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../../services/userService';
import db from '../../models';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import {
    ErrorHandler,
    populateErrorWithHadledFields
} from '../../utils/errorHandler';
import validators from './validators';

const router = express.Router();
const userService = new UserService(db);

router
    .route('/')
    .post(validators.login, loggerMiddleware, async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { id: userid } = await userService.getUserByNameAndPassword(username, password);
            if (userid) {
                const accessToken = jwt.sign(
                    { username, userid },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '1800s' }
                );
                res.json({ accessToken });
            } else {
                throw new ErrorHandler(
                    401,
                    'Unauthenticated - bad credentials'
                );
            }
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    });


export default router;
