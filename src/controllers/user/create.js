import userModel from "../../models/userModel.js"

const create = (req, res) => {
  const user = req.body
  const result = userModel.create(user)

  res.json({
    success: "OK",
    data: result
  })
}

export default create