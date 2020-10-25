import GroupService from '../services/groupService';
import db from '../models';
import {
    ErrorHandler,
    populateErrorWithHandledFields
} from '../utils/errorHandler';

const groupService = new GroupService(db);

const getGroupById = async (req, res, next) => {
    try {
        const { id: groupId } = req.params;
        const group = await groupService.getById(groupId);
        if (!group) {
            throw new ErrorHandler(404, `Group with id ${groupId} not found`);
        } else {
            res.json(group);
        }
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const deleteGroupById = async (req, res, next) => {
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
        return next(populateErrorWithHandledFields(err, req));
    }
};

const getAllGroups = async (req, res, next) => {
    try {
        const groups = await groupService.getAllGroups();
        if (!groups) {
            throw new ErrorHandler(404, 'No groups found');
        } else {
            res.json(groups);
        }
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const createGroup = async (req, res, next) => {
    try {
        const groupData = req.body;
        const createdUser = await groupService.create(groupData);
        res.json({
            message: `Group with id ${createdUser.id} created`,
            data: createdUser
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const updateGroup = async (req, res, next) => {
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
        return next(populateErrorWithHandledFields(err, req));
    }
};
export {
    getGroupById,
    deleteGroupById,
    getAllGroups,
    createGroup,
    updateGroup
};
