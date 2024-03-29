import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config.js"
import userModel from "../../models/userModel.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const refreshToken = (req, res) => {
  let token = false
  // TODO: Obter cookie refreshToken
  const authorization = req.headers?.authorization
  if(authorization) token = authorization.split(' ')[1]

  if (!token) return res.status(401).json({
    error: "Usuario não autenticado", 
    code: "token-not-found"
  })

  jwt.verify(token, SECRET_KEY, async (error, decoded) => {
    if(error) return res.status(401).json({
      error: error.message, 
      code: "invalid-token"
    })

    const userFound = await userModel.getById(decoded.id)
    const sessionFound = await prisma.session.findUnique({
      where: {
        token: token,
        user_id: userFound.id
      }
    })

    if (!sessionFound.id) return res.status(401).json({
      code: "session deprecaded"
    })

    const accessToken = jwt.sign(
      {id: userFound.id, name: userFound.name}, // Payload
      SECRET_KEY, // Secret Key to validate
      {expiresIn: '1m', algorithm: 'HS256'} // Expire time
    )
    const refreshToken = jwt.sign(
      {id: userFound.id},
      SECRET_KEY, // Secret Key to validate
      {expiresIn: '3m', algorithm: 'HS256'} // Expire time
    )

    await prisma.session.update({
      where: {
        id: userFound.id,
        token: token
      },
      data: {
        token: refreshToken
      }
    })

    delete userFound.password
    return res.json({
      success: `Access Token e Refresh Token revalidado!`,
      user: userFound,
      accessToken: accessToken,
      refreshToken: refreshToken
    })
    
  })


  next()

  return true
}

export default refreshToken
