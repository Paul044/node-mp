import { Model } from 'sequelize';

export default class UserGroup extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                tableName: 'userGroups',
                sequelize,
                timestamps: false
            }
        );
    }
}
