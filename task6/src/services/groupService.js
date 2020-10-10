export default class GroupService {
    constructor(models) {
        this.model = models.Group;
        this.userModel = models.User;
    }

    getAllGroups() {
        return this.model.findAll({
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
    }

    getById(groupId) {
        return this.model.findByPk(groupId, { paranoid: false });
    }

    create(groupItem) {
        return this.model.create(groupItem);
    }

    update(groupItem) {
        return this.model
            .findByPk(groupItem.id)
            .then((item) => item.update(groupItem));
    }

    delete(groupId) {
        return this.model.destroy({
            where: {
                id: groupId
            }
        });
    }
}
