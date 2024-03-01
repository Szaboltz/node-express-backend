import productModel from "../../models/productModel.js"

const remove = (req, res) => {
  const id = req.body.id
  const result = productModel.remove(id)

  res.json({
    success: "OK",
    data: result
  })
}

export default remove