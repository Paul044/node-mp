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
        return this.model.create(userItem);
    }

    update(userItem) {
        return this.model
            .findByPk(userItem.id)
            .then((item) => item.update(userItem));
    }

    delete(userId) {
        // As user table supports soft delete (paranoid: true), we have to delete linked entity from UserGroups table
        return sequelize.transaction((t) => {
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
    }

    @serviceLoggerDecorator
    getById(userId) {
        return this.model.findByPk(userId, { paranoid: false });
    }

    getFilteredSliceOfUsers(limit, loginSubstring) {
        return this.model.findAll({
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
    }
}
