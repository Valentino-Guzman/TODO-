import { Router } from 'express'
import { getTasks, getTasksById, createTasks, updateTasks, deleteTasks } from '../controllers/tasks.controller.js'

const router = Router()
 
router.get('/tareas', getTasks)

router.get('/tareas/:id', getTasksById)

router.post('/tareas', createTasks)
  
router.put('/tareas/:id', updateTasks)
  
router.delete('/tareas/:id', deleteTasks)
  
export default router