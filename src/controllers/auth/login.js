import userModel from "../../models/userModel.js"

const login = async (req, res) => {
  const {email, password} = req.body
  const userFound = await userModel.getByEmail(email)
  
}

export default login