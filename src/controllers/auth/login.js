import userModel from "../../models/userModel.js"
import {compare} from 'bcrypt'

const login = async (req, res) => {
  const {email, password} = req.body
  const userFound = await userModel.getByEmail(email)
  
  // Verificar se o email existe
  if(!userFound) return res.status(401).json({
      error: "Email ou senha inválida!"
  })

  //verificar se o hash é válido (bcrypt)
  const isValid = await compare(password, userFound.password)
  if(!isValid) return res.status(401).json({
      error: "Email ou senha inválida!"
  })

  //continuar o login e gerar os token de acesso

    
  return res.json({
    success: `Usuário do login!`,
    user: userFound
  })

}

export default login