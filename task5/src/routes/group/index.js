import express from 'express';
import GroupService from '../../services/groupService';
import db from '../../models';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';
import { ErrorHandler, populateErrorWithHadledFields } from '../../utils/errorHandler';

const router = express.Router();
const groupService = new GroupService(db);

router
    .route('/:id')
    .get(loggerMiddleware, async (req, res, next) => {
        try {
            const { id: groupId } = req.params;
            const group = await groupService.getById(groupId);
            if (!group) {
                throw new ErrorHandler(
                    404,
                    `Group with id ${groupId} not found`
                );
            } else {
                res.json(group);
            }
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    })
    .delete(loggerMiddleware, async (req, res, next) => {
        try {
            const { id: groupId } = req.params;
            // const group = await groupService.getById(groupId);
            // if (!group) {
            //     res.status(404).json({
            //         message: `Group with id ${groupId} not found`
            //     });
            // } else {
            await groupService.delete(groupId);
            res.json({
                message: `Group with id ${groupId} deleted`
            });
            // }
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    });

router
    .route('/')
    .get(loggerMiddleware, async (req, res, next) => {
        try {
            const groups = await groupService.getAllGroups();
            if (!groups) {
                throw new ErrorHandler(404, 'No groups found');
            } else {
                res.json(groups);
            }
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    })
    .post(loggerMiddleware, async (req, res, next) => {
        try {
            const groupData = req.body;
            const createdUser = await groupService.create(groupData);
            res.json({
                message: `Group with id ${createdUser.id} created`,
                data: createdUser
            });
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    })
    .put(loggerMiddleware, async (req, res, next) => {
        try {
            const group = req.body;
            const storedUser = await groupService.getById(group.id);
            if (!storedUser) {
                throw new ErrorHandler(
                    404,
                    `Group with id ${group.id} not found. Update failed`
                );
            }
            await groupService.update(group);
            res.json({
                message: `Group with id ${group.id} updated`
            });
            return next();
        } catch (err) {
            return next(populateErrorWithHadledFields(err, req));
        }
    });
export default router;
