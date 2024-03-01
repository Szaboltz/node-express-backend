import productModel from "../../models/productModel.js"
import userModel from "../../models/userModel.js"


const create = (req, res) => {
  const product = req.body
  const result = productModel.create(product)

  res.json({
    success: "OK",
    data: result
  })
}

export default create