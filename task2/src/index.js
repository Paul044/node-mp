import express from 'express';

import userRouter from './routes/user';
import autoSuggestRouter from './routes/autoSuggest';

const app = express();
const port = process.env.PORT || 3001;

app.listen(port);
app.use(express.json());
app.use('/users', userRouter);
app.use('/', autoSuggestRouter);

process.stdout.write(`Server is running on port ${port} \n`);
