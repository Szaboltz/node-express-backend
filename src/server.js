import express from "express"
import ENV from "./config.js"
import logger from "./middlewares/logger.js"
import userRouter from "./routers/userRouter.js"
import productRounter from "./routers/productRouter.js"
import authRounter from "./routers/authRouter.js"

const app = express()

app.use(express.json()) // Esse cara é um midware
app.use(logger)  // Middleware global para todos os users 
app.use("/users", userRouter)
app.use("/products", productRounter)
app.use("/auth", authRounter)

app.listen(ENV.PORT, () => {
  console.log(`Server in running on port ${ENV.URL}${ENV.PORT}`)
})