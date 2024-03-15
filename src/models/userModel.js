import { z } from "zod"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  list: async () => {
    return await prisma.user.findMany()
  },
  getById: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: id
      }
    }) 
  },
  create: async (data) => {
    return await prisma.user.create({data})
  },
  validateUpdate: (data) => {
    return USER_SCHEMA.safeParse(data)
  },
  update: async (data) => {
    return await prisma.user.update({
      where: {
         id: data.id
      },
      data: data
    })
  },
  validateId: (id) => {
    const partialSchema = USER_SCHEMA.partial({
      name: true,
      email: true
    })
    return partialSchema.safeParse(id)
  },
  remove: async (id) => {
    return await prisma.user.delete({
      where: {
        id: id
      }
    })
  }
}

export default userModel