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
    .put(validators.userWithId, (req, res) => {
        const { id: userId } = req.params;
        const storedUser = getUserById(userId);
        if (!storedUser) {
            res.status(404).json({
                message: `User with id ${userId} not found. Update failed`
            });
        }
        if (userId !== storedUser.id) {
            res.status(500).json({
                message: 'Inconsistent data, check userId'
            });
        }
        const user = req.body;
        updateUser(user);
        res.json({
            message: `User with id ${userId} updated`
        });
    })
    .delete((req, res) => {
        const { id: userId } = req.params;
        deleteUser(userId);
        res.json({
            message: `User with id ${userId} deleted`
        });
    });

router.put('/', validators.user, (req, res) => {
    const userData = req.body;
    const createdUser = createUser(userData);

    res.json({
        message: `User with id ${createdUser.id} created`,
        data: createdUser
    });
});

export default router;
