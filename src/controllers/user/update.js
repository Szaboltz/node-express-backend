import userModel from "../../models/userModel.js";

const update = async (req, res) => {
  const user = {...req.body, id: +req.params.id} // O + converte de str para number
  const validatedData = userModel.validateUpdate(user)
	if(!validatedData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validatedData.error.flatten().fieldErrors
		})
	}
  const result = await userModel.update(validatedData.data);

  res.json({
    success: "OK",
    data: result
  })
}

export default update