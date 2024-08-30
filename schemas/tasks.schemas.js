import { z } from 'zod'; 

const taskSchema = z.object({
    titulo: z.string({
        invalid_type_error: 'El titulo tiene que ser un string',
        required_error: 'El titulo es requerido'
    }),
    descripcion: z.string({
        invalid_type_error: 'La descripcion tiene que ser un string',
        required_error: 'La descripcion es requerida'
    })
})

export function validateTask(input) {
    return taskSchema.safeParse(input)
}