import { Op } from 'sequelize';

export default class UserService {
    constructor(model) {
        this.model = model;
    }

    async create(userItem) {
        try {
            const data = await this.model.create(userItem);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async update(userItem) {
        try {
            const item = await this.model.findByPk(userItem.id);
            const updatedItem = await item.update(userItem);
            return updatedItem;
        } catch (err) {
            throw err;
        }
    }

    async delete(userId) {
        try {
            const deletedItem = await this.model.destroy({
                where: {
                    id: userId
                }
            });
            return deletedItem;
        } catch (err) {
            throw err;
        }
    }

    async getById(userId) {
        try {
            const data = await this.model.findByPk(userId, { paranoid: false });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getFilteredSliceOfUsers(limit, loginSubstring) {
        try {
            const data = await this.model.findAll({
                where: {
                    [Op.and]: [{ login: { [Op.substring]: loginSubstring } }]
                },
                order: [
                    ['login', 'ASC']
                ],
                limit
            });
            return data;
        } catch (err) {
            throw err;
        }
    }
}
