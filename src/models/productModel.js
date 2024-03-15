import products from "../db/product.js"
import { z } from "zod"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PRODUCT_SCHEMA = z.object({
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
  price: z
  .number({
    invalid_type_error: "O preço deve ser um número",
    required_error: "O preço é obrigatório"
  })
}) 

const productModel = {
  listAll: async () => {
    return await prisma.product.findMany()
  },
  validateCreate: (data) => {
    const partialSchema = PRODUCT_SCHEMA.partial({id: true})
    return partialSchema.safeParse(data)
  },
  getBtID: async (id) => {
    return await prisma.product.findUnique({
      where: {
        id: id
      }
    })
  },
  create: async (data) => {
    return await prisma.product.create({data})
  },
  validateUpdate: (data) => {
    return PRODUCT_SCHEMA.safeParse(data)
  },
  update: async (data) => {
    return await prisma.product.update({
      where: {
        id: data.id
      },
      data: data
    })
  },
  validateId: (id) => {
    const partialSchema = PRODUCT_SCHEMA.partial({
      name: true,
      price: true
    })
    return partialSchema.safeParse(id)
  },
  remove: async (id) => {
    return await prisma.product.delete({
      where: {
        id: id
      }
    })
  }
}

export default productModel