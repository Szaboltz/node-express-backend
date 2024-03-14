import productModel from "../../models/productModel.js"

const remove = (req, res) => {
  const id = +req.params.id
  const validatedData = productModel.validateId({id})
	if(!validatedData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validatedData.error.flatten().fieldErrors
		})
	}
  const result = productModel.remove(validatedData.data.id)

  res.json({
    success: "OK",
    data: result
  })
}

export default remove