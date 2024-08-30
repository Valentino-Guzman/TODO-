import { pool } from "../config/database.js"
import { validateTask } from "../../schemas/tasks.schemas.js"

const ACCEPT_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://localhost:4200'
  ]

export const getTasks = async (req, res) => {
    const origin = req.header('origin')
    if (ACCEPT_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    const [result] = await pool.query('SELECT id, titulo, descripcion, completada FROM tareas;')
    res.json(result)
}

export const getTasksById = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('SELECT id, titulo, descripcion, completada FROM tareas WHERE id = ?;', [id])
    res.json(result)
}

export const createTasks = async (req, res) => {
    const origin = req.header('origin')
    if (ACCEPT_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    const result = validateTask(req.body)

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { titulo, descripcion } = result.data
    const [rows] = await pool.query('INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)', [ titulo, descripcion])
    res.status(201).json({
        id: rows.insertId,
        titulo,  
        descripcion,
    }) 
}

export const updateTasks = async (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, completada } = req.body

    const[result] = await pool.query('UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?', [titulo, descripcion, completada, id])
    if (result.affectedRows === 0) {
        return res.status(404).json({
         message: 'No se encontro usuario'
        }) 
    } 
    const [rows] = await pool.query('SELECT id, titulo, descripcion, completada FROM tareas WHERE id = ?', [id])
    res.json(rows[0])
}

export const deleteTasks = async (req, res) => {
    const origin = req.header('origin')
    if (ACCEPT_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id])
    if (result.affectedRows <= 0) {
        return res.status(404).json({
            message: 'No se encontro usuario'
        }) 
    } 
    res.sendStatus(204)
}