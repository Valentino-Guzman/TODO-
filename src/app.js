import express from 'express';
import taskRouter from './routes/tasks.router.js'
import userRouter from './routes/users.router.js'

const app = express();
app.disable('x-powered-by')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.use((req,res,next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app;