import userModel from "../../models/userModel.js";

const update = (req, res) => {
  const user = req.body;
  const validatedData = userModel.validateUpdate(user)
	if(!validatedData.success){
		return res.status(400).json({
			error: "Dados Inválidos!",
			fields: validatedData.error.flatten().fieldErrors
		})
	}
  const result = userModel.update(validatedData.data);

  res.json({
    success: "OK",
    data: result
  })
}

export default update