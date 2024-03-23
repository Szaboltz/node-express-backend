import userModel from "../../models/userModel.js"

const getByIdController = async (req, res) => {
  const id = +req.params.id
  const validateData = userModel.validateId({id})
  if(!validateData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validateData.error.flatten().fieldErrors
		})
	}

  const userResult = await userModel.getById(validateData.data.id)
  delete userResult.password

  res.json({
    success: `Usuário com o id ${id} econtrado com sucesso!`,
    data: userResult
  })
}

export default getByIdController