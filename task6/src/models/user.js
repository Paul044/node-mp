import { Model, DataTypes, literal } from 'sequelize';

export default class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: literal('uuid_generate_v4()'),
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
                tableName: 'users',
                sequelize,
                paranoid: true
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.Group, {
            through: models.UserGroup,
            as: 'groups',
            foreignKey: 'userId',
            otherKey: 'groupId',
            onDelete: 'CASCADE',
            hooks: true
        });
    }
}
