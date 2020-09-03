import { Op } from 'sequelize';

export default class UserService {
    constructor(model) {
        this.model = model;
    }

    create(userItem) {
        try {
            const data = this.model.create(userItem);
            return data;
        } catch (err) {
            throw err;
        }
    }

    update(userItem) {
        try {
            const updatedItem = this.model
                .findByPk(userItem.id)
                .then((item) => item.update(userItem));
            return updatedItem;
        } catch (err) {
            throw err;
        }
    }

    delete(userId) {
        try {
            const deletedItem = this.model.destroy({
                where: {
                    id: userId
                }
            });
            return deletedItem;
        } catch (err) {
            throw err;
        }
    }

    getById(userId) {
        try {
            const data = this.model.findByPk(userId, { paranoid: false });
            return data;
        } catch (err) {
            throw err;
        }
    }

    getFilteredSliceOfUsers(limit, loginSubstring) {
        try {
            const data = this.model.findAll({
                where: {
                    [Op.and]: [{ login: { [Op.substring]: loginSubstring } }]
                },
                order: [['login', 'ASC']],
                limit
            });
            return data;
        } catch (err) {
            throw err;
        }
    }
}
