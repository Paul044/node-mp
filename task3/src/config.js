import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT
};

export default {
    port: process.env.PORT,
    databaseConfig
};
