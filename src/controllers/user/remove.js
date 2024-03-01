import userModel from "../../models/userModel.js"

const remove = (req, res) => {
  const id = req.body.id
  const result = userModel.remove(id)

  res.json({
    success: "OK",
    data: result
  })
}

export default remove