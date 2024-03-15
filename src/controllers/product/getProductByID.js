import productModel from "../../models/productModel.js"

const getProductByID = async (req, res) => {
  const id = +req.params.id
  const validateData = productModel.validateId({id})

  res.json({
    success: "OK",
    data: await productModel.getBtID(id)
  })
}

export default getProductByID