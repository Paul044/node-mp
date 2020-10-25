import fs from 'fs';
import path from 'path';

import sequelize from '../data-access';

const db = {};

// eslint-disable-next-line no-sync
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== -1 && file !== 'index.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file)).default;
        db[model.name] = model.init(sequelize);
    });

Object.keys(db).forEach((modelName) => {
    if (typeof db[modelName].associate === 'function') {
        db[modelName].associate(db);
    }
});

sequelize.sync();

export default db;
