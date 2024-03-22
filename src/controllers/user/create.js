import userModel from "../../models/userModel.js"
import { hash } from "bcrypt"

const create = async (req, res) => {
  const user = req.body
  const validatedData = userModel.validateCreate(user)
  if(!validatedData.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      fields: validatedData.error.flatten().fieldErrors
    })
  }

  validatedData.data.password = hash(validatedData.data.password, 10)
  const result = await userModel.create(validatedData.data)
  delete result.password
  res.json({
    success: "OK",
    data: result
  })
}

export default create