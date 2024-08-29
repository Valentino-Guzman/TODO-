import { Router } from 'express'
import { getTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasks.controller.js'

const router = Router()
 
router.get('api/tareas', getTasks)

router.post('api/tareas', createTasks)
  
router.put('api/tareas', updateTasks)
  
router.delete('api/tareas', deleteTasks)
  
export default router