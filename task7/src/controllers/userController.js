import UserService from '../services/userService';
import db from '../models';
import {
    ErrorHandler,
    populateErrorWithHandledFields
} from '../utils/errorHandler';

const userService = new UserService(db);

const getUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const user = await userService.getById(userId);
        if (!user) {
            throw new ErrorHandler(404, `User with id ${userId} not found`);
        } else {
            res.json(user);
        }
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const user = await userService.getById(userId);
        if (!user) {
            throw new ErrorHandler(404, `User with id ${userId} not found`);
        } else {
            await userService.delete(userId);
            res.json({
                message: `User with id ${userId} deleted`
            });
        }
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = req.body;
        // Is it OK to call userService.getById in this put route ?
        const storedUser = await userService.getById(user.id);
        if (!storedUser) {
            throw new ErrorHandler(
                404,
                `User with id ${user.id} not found. Update failed`
            );
        }
        await userService.update(user);
        res.json({
            message: `User with id ${user.id} updated`
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};

const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const createdUser = await userService.create(userData);
        res.json({
            message: `User with id ${createdUser.id} created`,
            data: createdUser
        });
        return next();
    } catch (err) {
        return next(populateErrorWithHandledFields(err, req));
    }
};
export { getUser, deleteUser, updateUser, createUser };
