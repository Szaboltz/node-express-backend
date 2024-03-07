import users from "../db/user.js"
import { z } from "zod"

const USER_SCHEMA = z.object({
  id: z
  .number({
    invalid_type_error: "O id deve ser um número",
    required_error: "O id é obrigatório"
  })
  .int(),
  name: z
  .string({
    invalid_type_error: "O id deve ser uma string",
    required_error: "O nome é obrigatório"
  })
  .min(3, { 
    message: "O nome do usuário deve conter no mínimo 3 caracteres!" 
  })
  .max(200, {
    message: "O Nome do usuário deve contem no máximo 200 caracteres"
  }),
  email: z
  .string({
    invalid_type_error: "O email deve ser uma string",
    required_error: "O email é obrigatório"
  })
  .email({
    message: "Email inválido!"
  })
})

const userModel = {
  validateCreate: (data) => {
    const partialSchema = USER_SCHEMA.partial({id: true})
    return partialSchema.safeParse(data)
  },
  list: () => {
    return users
  },
  create: (data) => {
    data.id = users[users.length - 1].id + 1
    users.push(data)
    return users
  },
  validateUpdate: (data) => {
    return USER_SCHEMA.safeParse(data)
  },
  update: (data) => {
      return users.map((user) => {
        if (user.id == data.id) {
          user.name = data.name || user.name;
          user.email = data.email || user.email
        }
        return user
    })
  },
  validateId: (id) => {
    const partialSchema = USER_SCHEMA.partial({
      name: true,
      email: true
    })
    return partialSchema.safeParse(id)
  },
  remove: (id) => {
    return users.filter((data) => data.id != id)
  }
}

export default userModel