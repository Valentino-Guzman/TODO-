import express from 'express';
import cors from 'cors';
import taskRouter from './routes/tasks.router.js'
import userRouter from './routes/users.router.js'

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200', // Permitir solicitudes solo desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permitir credenciales (cookies, headers de autorización)
}));

app.disable('x-powered-by')

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', taskRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app; 