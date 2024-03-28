import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({
    error: "Usuario não autenticado", 
    code: "token-not-found"
  })

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if(error) return res.status(401).json({
      error: error.message, 
      code: "token-not-found"
    })

    req.useLogged = {id: decoded.id, name: decoded.name}
  })
  next()
}

export default auth
