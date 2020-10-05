import { Op } from 'sequelize';
import sequelize from '../data-access';
import { serviceLoggerDecorator } from '../utils/logger';

export default class UserService {
    constructor(models) {
        this.model = models.User;
        this.userGroupsModel = models.UserGroup;
        this.groupModel = models.Group;
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
            // As user table supports soft delete (paranoid: true), we have to delete linked entity from UserGroups table
            sequelize.transaction((t) => {
                this.userGroupsModel.destroy(
                    {
                        where: {
                            userId
                        }
                    },
                    { transaction: t }
                );
                return this.model.destroy(
                    {
                        where: {
                            id: userId
                        }
                    },
                    { transaction: t }
                );
            });
        } catch (err) {
            throw err;
        }
    }

    @serviceLoggerDecorator
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
                limit,
                include: [
                    {
                        model: this.groupModel,
                        as: 'groups',
                        required: false,
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }
                ]
            });
            return data;
        } catch (err) {
            throw err;
        }
    }
}
