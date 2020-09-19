import sequelize from '../data-access';

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
                .then(() => console.log('LOG:: Succeeded transaction'))
                .catch(() => {
                    console.log('LOG:: Failed transaction');
                    throw new Error('Failed transaction for adding userGroups');
                });
        } catch (err) {
            // This validation doesn't work somehow, check by AddUserToGroup same items several times
            throw err;
        }
    }
}
