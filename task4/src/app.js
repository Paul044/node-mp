import express from 'express';

import './initializeConfigs';
import userRouter from './routes/user';
import autoSuggestRouter from './routes/autoSuggest';
import groupRouter from './routes/group';
import userGroupRouter from './routes/userGroup';

const app = express();
const port = process.env.PORT || 3001;

app.listen(port);
app.use(express.json());
app.use('/users', userRouter);
app.use('/', autoSuggestRouter);
app.use('/groups', groupRouter);
app.use('/userGroup', userGroupRouter);

process.stdout.write(`Server is running on port ${port} \n`);
