import productModel from "../../models/productModel.js"

const getProductByID = (req, res) => {
  const id = +req.params.id
  const validateData = productModel.validateId({id})

  res.json({
    success: "OK",
    data: validateData.success ? productModel.getBtID(id) : validateData.error.flatten().fieldErrors
  })
}

export default getProductByID