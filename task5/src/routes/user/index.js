import express from 'express';

import validators from './validators';
import UserService from '../../services/userService';
import db from '../../models';
import { apiLoggerMiddleware as loggerMiddleware } from '../../utils/logger';

const userService = new UserService(db);
const router = express.Router();

router
    .route('/:id')
    .get(validators.uuid, loggerMiddleware, async (req, res) => {
        try {
            const { id: userId } = req.params;
            const user = await userService.getById(userId);
            if (!user) {
                res.status(404).json({
                    message: `User with id ${userId} not found`
                });
            } else {
                res.json(user);
            }
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    })
    .delete(validators.uuid, loggerMiddleware, async (req, res) => {
        try {
            const { id: userId } = req.params;
            const user = await userService.getById(userId);
            if (!user) {
                res.status(404).json({
                    message: `User with id ${userId} not found`
                });
            } else {
                await userService.delete(userId);
                res.json({
                    message: `User with id ${userId} deleted`
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
    .put(validators.userWithId, loggerMiddleware, async (req, res) => {
        try {
            const user = req.body;
            // Is it OK to call userService.getById in this put route ?
            const storedUser = await userService.getById(user.id);
            if (!storedUser) {
                res.status(404).json({
                    message: `User with id ${user.id} not found. Update failed`
                });
            }
            await userService.update(user);
            res.json({
                message: `User with id ${user.id} updated`
            });
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    })
    .post(validators.user, loggerMiddleware,  async (req, res) => {
        try {
            const userData = req.body;
            const createdUser = await userService.create(userData);
            res.json({
                message: `User with id ${createdUser.id} created`,
                data: createdUser
            });
        } catch (err) {
            res.status(err.status || 500).json({
                message: err
            });
        }
    });

export default router;
