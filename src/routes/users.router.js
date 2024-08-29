import { Router } from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controllers/users.controller.js'

const router = Router()

router.get('api/usuarios', getUsers)

router.get('api/usuarios/:id', getUsersById)

router.post('api/usuarios', createUsers)
  
router.patch('api/usuarios/:id', updateUsers)
  
router.delete('api/usuarios/:id', deleteUsers)
  
export default router