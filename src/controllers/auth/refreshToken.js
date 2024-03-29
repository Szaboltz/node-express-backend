import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config.js"
import userModel from "../../models/userModel.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const refreshToken = (req, res) => {
  // TODO: Obter cookie refreshToken
  const authorization = req.headers.authorization?.split(' ')[1]

  if (!authorization) return res.status(401).json({
    error: "Usuario não autenticado", 
    code: "refresh-token-not-found"
  })

  jwt.verify(token, SECRET_KEY, async (error, decoded) => {
    if(error) return res.status(401).json({
      error: error.message, 
      code: "invalid-refresh-token"
    })

    const userFound = await userModel.getById(decoded.id)
    const sessionFound = await prisma.session.findUnique({
      where: {
        token: token,
        user_id: userFound.id
      }
    })

    if (!sessionFound) return res.status(401).json({
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
        token: token,
        user_id: userFound.id
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

  return true
}

export default refreshToken
