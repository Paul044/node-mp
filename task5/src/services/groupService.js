export default class GroupService {
    constructor(models) {
        this.model = models.Group;
        this.userModel = models.User;
    }

    getAllGroups() {
        try {
            const data = this.model.findAll({
                include: [
                    {
                        model: this.userModel,
                        as: 'users',
                        required: false,
                        attributes: ['id', 'login'],
                        through: { attributes: [] }
                    }
                ]
            });
            return data;
        } catch (err) {
            throw err;
        }
    }

    getById(groupId) {
        try {
            const data = this.model.findAll({
                where: {
                    id: groupId
                }
            });
            return data;
        } catch (err) {
            throw err;
        }
    }

    create(groupItem) {
        try {
            const data = this.model.create(groupItem);
            return data;
        } catch (err) {
            throw err;
        }
    }

    update(groupItem) {
        try {
            const updatedItem = this.model
                .findByPk(groupItem.id)
                .then((item) => item.update(groupItem));
            return updatedItem;
        } catch (err) {
            throw err;
        }
    }

    delete(groupId) {
        try {
            const deletedItem = this.model.destroy({
                where: {
                    id: groupId
                }
            });
            return deletedItem;
        } catch (err) {
            throw err;
        }
    }
}
