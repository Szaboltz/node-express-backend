import userModel from "../../models/userModel.js"

const create = (req, res) => {
  const user = req.body
  const validateData = userModel.validateCreate(user)
  if(!validateData.success) {
    return res.status(401).json({
      error: "Dados inválidos"
    })
  }
  const result = userModel.create(user)

  res.json({
    success: "OK",
    data: result
  })
}

export default create