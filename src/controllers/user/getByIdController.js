import userModel from "../../models/userModel.js"

const getByIdController = (req, res) => {
  const id = +req.params.id
  const validateData = userModel.validateId({id})

  res.json({
    success: "OK",
    data: validateData.success ? userModel.getById(id) : validateData.error.flatten().fieldErrors
  })
}

export default getByIdController