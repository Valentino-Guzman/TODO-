import { Router } from 'express'
import { getTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasks.controller.js'

const router = Router()
 
router.get('/tareas', getTasks)

router.post('/tareas', createTasks)
  
router.put('/tareas', updateTasks)
  
router.delete('/tareas', deleteTasks)
  
export default router