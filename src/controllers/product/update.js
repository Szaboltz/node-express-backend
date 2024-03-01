import productModel from "../../models/productModel.js";

const update = (req, res) => {
  const product = req.body;
  const result = productModel.update(product) 

  res.json({
    success: "OK",
    data: result
  })
}

export default update