import products from "../db/product.js"
import { z } from "zod"

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
  listAll: () => {
    return products
  },
  validateCreate: (data) => {
    const partialSchema = PRODUCT_SCHEMA.partial({id: true})
    return partialSchema.safeParse(data)
  },
  create: (data) => {
    data.id = products[products.length - 1].id + 1
    products.push(data)
    return products
  },
  validateUpdate: (data) => {
    return PRODUCT_SCHEMA.safeParse(data)
  },
  update: (data) => {
    return products.map((product) => {
      if (product.id == data.id) {
        product.name = data.name || product.name;
        product.email = data.email || product.email
      }
      return product; 
    });
  },
  validateId: (id) => {
    const partialSchema = PRODUCT_SCHEMA.partial({
      name: true,
      price: true
    })
    return partialSchema.safeParse(id)
  },
  remove: (id) => {
    return products.filter((data) => data.id != id)
  }
}

export default productModel