import { pool } from "../config/database.js"
import { validateUsers } from "../../schemas/users.schemas.js"

//obtener usuario
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios;')
        res.json(rows)
     
    } catch (error) {  
        return res.status(500).json({
            mesagge:'error'
        })
    }
}
//obtener usuario por id
export const getUsersById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?;', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.json(rows[0])   
    } catch (error) {
        return res.status(500).json({
            mesagge:'Algo fue mal'
        })
    }
}

//crear usuario
export const createUsers = async (req, res) => {
    const result = validateUsers(req.body);

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { nombre, apellido, email, contraseña } = result.data

    try {
        const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)', [ nombre, apellido, email, contraseña])
        res.status(201).json({
            id: rows.insertId,
            nombre,
            apellido,
            email,
            contraseña
        }) 
    } catch (error) {
        return res.status(500).json({
            mesagge:'Algo fue mal'
        })
    }
}

//actualizar usuario
export const updateUsers = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, email, contraseña } = req.body
    
    try {
        const [result] = await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contraseña = ? WHERE id = ?', [nombre, apellido, email, contraseña, id] )
            if (result.affectedRows === 0) {
                return res.status(404).json({
                 message: 'No se encontro usuario'
                }) 
            } 
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mesagge:'Algo fue mal'
        })
    }

}

export const deleteUsers = async (req, res) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?;', [req.params.id])
    if (result.affectedRows <= 0) {
        return res.status(404).json({
            message: 'No se encontro usuario'
        }) 
    } 
    res.sendStatus(204)
}

