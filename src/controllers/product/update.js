import productModel from "../../models/productModel.js";

const update = async (req, res) => {
  const product = {...req.body, id: +req.params.id}
  const validatedData = productModel.validateUpdate(product)
	if(!validatedData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validatedData.error.flatten().fieldErrors
		})
	}
  const result = await productModel.update(validatedData.data) 

  res.json({
    success: "OK",
    data: result
  })
}

export default update