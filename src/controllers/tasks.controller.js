import { pool } from "../config/database.js"

export const getTasks = async (req, res) => {
    const [result] = await pool.query('SELECT titulo, descripcion, completada FROM tareas;')
    res.json(result)
}

export const createTasks = async (req, res) => {
    const { usuario_id, titulo, fecha_creacion, fecha_vencimiento, descripcion, completada } = req.body
    const [rows] = await pool.query('INSERT INTO tareas (usuario_id, titulo, fecha_creacion, fecha_vencimiento, descripcion, completada) VALUES (?, ?, ?, ?, ?, ?)', [ usuario_id, titulo, fecha_creacion, fecha_vencimiento, descripcion, completada])
    res.send({rows})
}

export const updateTasks = (req, res) => {
    res.send('actualizando tareas')
}

export const deleteTasks = (req, res) => {
    res.send('eliminando tareas')
}