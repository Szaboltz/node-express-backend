import productModel from "../../models/productModel.js"


const listAll = async (req, res) => {
  res.json({
    success: "OK",
    data: await productModel.listAll()
  })
}

export default listAll