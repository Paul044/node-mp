import { Model, DataTypes, literal } from 'sequelize';

class Group extends Model {
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
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                permissions: {
                    type: DataTypes.ARRAY(
                        DataTypes.ENUM({
                            values: [
                                'READ',
                                'WRITE',
                                'DELETE',
                                'SHARE',
                                'UPLOAD_FILES'
                            ]
                        })
                    ),
                    allowNull: false
                }
            },
            {
                tableName: 'groups',
                sequelize,
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.User, {
            through: models.UserGroup,
            as: 'users',
            foreignKey: 'groupId',
            otherKey: 'userId',
            onDelete: 'CASCADE'
        });
    }
}

export default Group;

