import { PORT } from './config/dotenv.config.js'
import app from './app.js'

app.listen(PORT, () => {
    console.log(`Se abrio el servidor en el puerto: http://localhost:${PORT}`)
})