import express from 'express';
import UserGroupService from '../../services/userGroupService';
import db from '../../models';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import { populateErrorWithHadledFields } from '../../utils/errorHandler';

const router = express.Router();

const userGroupService = new UserGroupService(db);

router.route('/').get(loggerMiddleware, async (req, res, next) => {
    try {
        const userGroups = await userGroupService.getAllUserGroups();
        res.json({
            data: userGroups
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHadledFields(err, req));
    }
});

router.route('/addUsersToGroup').post(loggerMiddleware, async (req, res, next) => {
    try {
        const data = req.body;

        const result = await userGroupService.addUsersToGroup(data);
        res.json({
            message: `Users added to group ${data.groupId}`,
            data: result
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHadledFields(err, req));
    }
});

export default router;
