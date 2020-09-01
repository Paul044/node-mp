import Sequelize from 'sequelize';
import { databaseConfig } from '../config';

const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        port: databaseConfig.port,
        dialect: databaseConfig.dialect,
        logging: console.log
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

export default sequelize;
