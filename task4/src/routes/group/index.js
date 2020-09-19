import express from 'express';
import GroupService from '../../services/groupService';
import db from '../../models';

const router = express.Router();
const groupService = new GroupService(db);

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const { id: groupId } = req.params;
            const group = await groupService.getById(groupId);
            if (!group) {
                res.status(404).json({
                    message: 'No group found'
                });
            } else {
                res.json(group);
            }
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    })
    .delete(async (req, res) => {
        try {
            const { id: groupId } = req.params;
            const group = await groupService.getById(groupId);
            if (!group) {
                res.status(404).json({
                    message: `Group with id ${groupId} not found`
                });
            } else {
                await groupService.delete(groupId);
                res.json({
                    message: `Group with id ${groupId} deleted`
                });
            }
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    });

router
    .route('/')
    .get(async (req, res) => {
        try {
            const Group = await groupService.getAllGroups();
            if (!Group) {
                res.status(404).json({
                    message: 'No groups found'
                });
            } else {
                res.json(Group);
            }
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    })
    .post(async (req, res) => {
        try {
            const groupData = req.body;
            const createdUser = await groupService.create(groupData);
            res.json({
                message: `Group with id ${createdUser.id} created`,
                data: createdUser
            });
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    })
    .put(async (req, res) => {
        try {
            const group = req.body;
            const storedUser = await groupService.getById(group.id);
            if (!storedUser) {
                res.status(404).json({
                    message: `Group with id ${group.id} not found. Update failed`
                });
            }
            await groupService.update(group);
            res.json({
                message: `Group with id ${group.id} updated`
            });
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    });
export default router;
