import productModel from "../../models/productModel.js"


const create = (req, res) => {
  const product = req.body
  const validatedData = productModel.validateCreate(product)
  if(!validatedData.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      fields: validatedData.error.flatten().fieldErrors
    })
  }
  const result = productModel.create(product)

  res.json({
    success: "OK",
    data: result
  })
}

export default create