import { z } from 'zod';

const userSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'El nombre tiene que ser un string',
        required_error: 'El nombre es requerido'
    }),
    apellido: z.string({
        invalid_type_error: 'El apellido tiene que ser un string',
        required_error: 'El apellido es requerido'
    }),
    email: z.string({
        invalid_type_error: 'El email tiene que ser un string',
        required_error: 'El email es requerido'
    }),
    contraseña: z.string({
        invalid_type_error: 'La contraseña tiene que ser un string',
        required_error: 'La contraseña es requerida'
    }),
})

export function validateUsers (input) {
    return userSchema.safeParse(input)
}


