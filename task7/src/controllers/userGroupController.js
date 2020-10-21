import UserGroupService from '../services/userGroupService';
import db from '../models';
import { populateErrorWithHandledFields } from '../utils/errorHandler';

const userGroupService = new UserGroupService(db);

const getUserGroup = async (req, res, next) => {
    try {
        const userGroups = await userGroupService.getAllUserGroups();
        res.json({
            data: userGroups
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const addUsersToGroup = async (req, res, next) => {
    try {
        const data = req.body;

        const result = await userGroupService.addUsersToGroup(data);
        res.json({
            message: `Users added to group ${data.groupId}`,
            data: result
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

export { getUserGroup, addUsersToGroup };
