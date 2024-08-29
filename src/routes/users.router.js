import { Router } from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controllers/users.controller.js'

const router = Router()

router.get('/usuarios', getUsers)

router.get('/usuarios/:id', getUsersById)

router.post('/usuarios', createUsers)
  
router.patch('/usuarios/:id', updateUsers)
  
router.delete('/usuarios/:id', deleteUsers)
  
export default router