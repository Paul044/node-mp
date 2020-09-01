import express from 'express';

import userRouter from './routes/user';
import autoSuggestRouter from './routes/autoSuggest';
import config from './config';

const app = express();
const port = config.PORT || 3001;

app.listen(port);
app.use(express.json());
app.use('/users', userRouter);
app.use('/', autoSuggestRouter);

process.stdout.write(`Server is running on port ${port} \n`);
