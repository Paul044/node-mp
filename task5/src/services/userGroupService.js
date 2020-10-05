import sequelize from '../data-access';
import logger from '../utils/logger';

export default class GroupService {
    constructor(models) {
        this.model = models.UserGroup;
    }

    getAllUserGroups() {
        try {
            const data = this.model.findAll({});
            return data;
        } catch (err) {
            throw err;
        }
    }

    addUsersToGroup(data) {
        try {
            const { groupId, userIds } = data;

            sequelize
                .transaction((t) => {
                    const promises = [];
                    userIds.forEach((userId) =>
                        promises.push(
                            this.model
                                .create({ userId, groupId }, { transaction: t })
                                .catch((err) => {
                                    throw err;
                                })
                        )
                    );
                    return Promise.all(promises);
                })
                .then(() => logger.info('Succeeded transaction'))
                .catch((err) => {
                    logger.error(err);
                    throw new Error('Failed transaction for adding userGroups');
                });
        } catch (err) {
            logger.error(err);
            // This validation doesn't work somehow, check by AddUserToGroup same items several times
            throw err;
        }
    }
}
