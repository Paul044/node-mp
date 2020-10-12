import express from 'express';
import cors from 'cors';

import './initializeConfigs';
import loginRouter from './routes/login';
import userRouter from './routes/user';
import autoSuggestRouter from './routes/autoSuggest';
import groupRouter from './routes/group';
import userGroupRouter from './routes/userGroup';
import logger from './utils/logger';
import { errorHandlerMiddleware } from './utils/errorHandler';
import {
    timeLoggerInitializeMiddleware,
    timeLoggerFinalizeMiddleware
} from './utils/timeLogger';
import authorizeMiddleware from './utils/authorizeMiddleware';

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(timeLoggerInitializeMiddleware);
app.use(authorizeMiddleware);
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/', autoSuggestRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);

app.use(timeLoggerFinalizeMiddleware);

app.use(errorHandlerMiddleware);

process.on('uncaughtException', async (error) => {
    logger.error(error.toString());
});

process.on('unhandledRejection', async (error) => {
    logger.error(error.toString());
});

app.listen(port);
logger.info(`Server is running on port ${port} \n`);
