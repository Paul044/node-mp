import express from 'express';
import UserGroupService from '../../services/userGroupService';
import db from '../../models';

const router = express.Router();

const userGroupService = new UserGroupService(db);

router.route('/').get(async (req, res) => {
    try {
        const userGroups = await userGroupService.getAllUserGroups();
        res.json({
            data: userGroups
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err
        });
    }
});

router.route('/addUsersToGroup').post(async (req, res) => {
    try {
        const data = req.body;

        const result = await userGroupService.addUsersToGroup(data);
        res.json({
            message: `Users added to group ${data.groupId}`,
            data: result
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err
        });
    }
});
export default router;
