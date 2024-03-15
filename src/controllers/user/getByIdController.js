import userModel from "../../models/userModel.js"

const getByIdController = async (req, res) => {
  const id = +req.params.id
  const validateData = userModel.validateId({id})

  res.json({
    success: "OK",
    data: await userModel.getById(id)
  })
}

export default getByIdController