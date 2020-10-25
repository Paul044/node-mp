import UserService from '../services/userService';
import db from '../models';

import { populateErrorWithHandledFields } from '../utils/errorHandler';

const userService = new UserService(db);

const getAutoSuggestedUsers = async (req, res, next) => {
    try {
        const { limit, loginSubstring } = req.query;
        const data = await userService.getFilteredSliceOfUsers(
            limit,
            loginSubstring
        );
        res.json(data);
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

export { getAutoSuggestedUsers };
