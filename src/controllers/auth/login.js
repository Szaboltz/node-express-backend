import userModel from "../../models/userModel.js"
import { compare } from 'bcrypt'
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const login = async (req, res) => {
  const {email, password} = req.body

  // Verificar se o email existe
  const userFound = await userModel.getByEmail(email)
  if(!userFound) return res.status(401).json({
      error: "Email ou senha inválida!"
  })

  //verificar se o hash é válido (bcrypt)
  const isValid = await compare(password, userFound.password)
  if(!isValid) return res.status(401).json({
      error: "Email ou senha inválida!"
  })

  //continuar o login e gerar os token de acesso
  const accessToken = jwt.sign(
      {id: userFound.id, name: userFound.name}, // Payload
      SECRET_KEY, // Secret Key to validate
      {expiresIn: '1m', algorithm: 'HS256'} // Expire time
    )

  console.log(accessToken)


  const refreshToken = jwt.sign(
    {id: userFound.id},
    SECRET_KEY, // Secret Key to validate
    {expiresIn: '3m', algorithm: 'HS256'} // Expire time
  )

  // TODO: Gerar Cookie para a web

  const session = await prisma.session.create({
    data: {
      user_id: userFound.id,
      // TODO: pegar header User-Agent
      client: "API DOG",
      token: refreshToken
    }
  })
  
  delete userFound.password
  return res.json({
    success: `Usuário do login!`,
    user: userFound,
    accessToken: accessToken,
    refreshToken: refreshToken
  })

}

export default login