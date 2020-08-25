import express from 'express';

import userRouter from './routes/user';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT || 3001;

app.listen(port);
app.use(express.json());
app.use('/user', userRouter);
app.use('/users', usersRouter);

process.stdout.write(`Server is running on port ${port} \n`);
