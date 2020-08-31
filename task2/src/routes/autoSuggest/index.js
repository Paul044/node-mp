import express from 'express';

import validators from './validators';
import { getFilteredSliceOfUsers } from '../../usersData';

const router = express.Router();

router.get(
    '/getAutoSuggestUsers',
    validators.getAutoSuggestUsersQuery,
    (req, res) => {
        const { limit, loginSubstring } = req.query;
        const data = getFilteredSliceOfUsers(limit, loginSubstring);
        res.json(data);
    }
);

export default router;
