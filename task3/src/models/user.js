import { Model, DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

export default class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    unique: true,
                    primaryKey: true
                },
                login: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                age: {
                    type: DataTypes.INTEGER
                }
            },
            {
                hooks: {
                    beforeCreate: (user) => {
                        user.id = uuid();
                    }
                },
                tableName: 'users',
                sequelize,
                paranoid: true
            }
        );
    }
}
