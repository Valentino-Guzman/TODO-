import express from 'express';
import taskRouter from './routes/tasks.router.js'
import userRouter from './routes/users.router.js'
import { pool } from './config/database.js';

const app = express();
app.disable('x-powered-by')

app.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT "Pong" AS result')
    res.json(result[0])
})
app.use(express.json())
app.use('/api', userRouter)
app.use(taskRouter)

app.use((req,res,next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app;