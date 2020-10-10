import sequelize from '../data-access';

export default class GroupService {
    constructor(models) {
        this.model = models.UserGroup;
    }

    getAllUserGroups() {
        return this.model.findAll({});
    }

    addUsersToGroup(data) {
        const { groupId, userIds } = data;

        return sequelize.transaction((t) => {
            const promises = [];
            userIds.forEach((userId) =>
                promises.push(
                    this.model.create({ userId, groupId }, { transaction: t }).catch((err) => {
                        throw err;
                    })
                )
            );
            return Promise.all(promises);
        });

        // Removing catch here, so sequelize error could be handled in generic error handler
        // .then(() => logger.info('Succeeded transaction'))
        // .catch((err) => {
        //     logger.error(err);
        //     throw new Error('Failed transaction for adding userGroups');
        // });
    }
}
