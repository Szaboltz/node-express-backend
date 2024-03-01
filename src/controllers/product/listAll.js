import productModel from "../../models/productModel.js"


const listAll = (req, res) => {
  res.json({
    success: "OK",
    data: productModel.listAll()
  })
}

export default listAll