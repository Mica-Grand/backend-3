import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config'; 

import connectDB from './config/database.js'; 
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoptions.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { swaggerUi, specs} from './config/swagger.js';


connectDB();


const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api-docs/`)

})
