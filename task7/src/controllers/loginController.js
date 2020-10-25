import jwt from 'jsonwebtoken';

import UserService from '../services/userService';
import db from '../models';
import {
    ErrorHandler,
    populateErrorWithHandledFields
} from '../utils/errorHandler';

const userService = new UserService(db);

const retrieveJwtToken = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { id: userid } = await userService.getUserByNameAndPassword(
            username,
            password
        );
        if (userid) {
            const accessToken = jwt.sign(
                { username, userid },
                process.env.TOKEN_SECRET,
                { expiresIn: '1800s' }
            );
            res.json({ accessToken });
        } else {
            throw new ErrorHandler(401, 'Unauthenticated - bad credentials');
        }
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

export { retrieveJwtToken };
