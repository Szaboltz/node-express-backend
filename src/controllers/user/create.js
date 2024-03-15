import userModel from "../../models/userModel.js"

const create = async (req, res) => {
  const user = req.body
  const validatedData = userModel.validateCreate(user)
  if(!validatedData.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      fields: validatedData.error.flatten().fieldErrors
    })
  }
  const result = await userModel.create(user)

  res.json({
    success: "OK",
    data: result
  })
}

export default create