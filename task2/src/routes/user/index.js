import express from 'express';

import {
    getUserById,
    updateUser,
    deleteUser,
    createUser
} from '../../usersData';
import validators from './validators';

const router = express.Router();

router
    .route('/:id')
    .get((req, res) => {
        const { id: userId } = req.params;
        const user = getUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `User with id ${userId} not found`
            });
        } else {
            res.json(user);
        }
    })
    .delete((req, res) => {
        const { id: userId } = req.params;
        const user = getUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `User with id ${userId} not found`
            });
        } else {
            deleteUser(userId);
            res.json({
                message: `User with id ${userId} deleted`
            });
        }
    });

router
    .route('/')
    .put(validators.userWithId, (req, res) => {
        const user = req.body;
        const storedUser = getUserById(user.id);
        if (!storedUser) {
            res.status(404).json({
                message: `User with id ${user.id} not found. Update failed`
            });
        }
        updateUser(user);
        res.json({
            message: `User with id ${user.id} updated`
        });
    })
    .post(validators.user, (req, res) => {
        const userData = req.body;
        const createdUser = createUser(userData);
        res.json({
            message: `User with id ${createdUser.id} created`,
            data: createdUser
        });
    });

export default router;
