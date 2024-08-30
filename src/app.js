import express from 'express';
import taskRouter from './routes/tasks.router.js'
import userRouter from './routes/users.router.js'
import cors from 'cors'
import { corsOptions } from './config/cors.config.js';

const app = express();
app.use(cors(corsOptions));
app.disable('x-powered-by')

app.use(express.json())
app.use('/api', userRouter)
app.use(taskRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app;