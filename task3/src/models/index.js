import Sequelize from 'sequelize';

import sequelize from '../data-access';
import UserModel from './user';

const models = {
    UserModel: UserModel.init(sequelize, Sequelize)
};

// unnecessary as we don't have assosiations for now, but I'll keep it for further purposes
Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

// uncomment to recreate Users table
// models.UserModel.sync({ force: true });

const db = {
    ...models,
    sequelize
};

module.exports = db;
