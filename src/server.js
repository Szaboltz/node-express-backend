import express from "express"
import ENV from "./config.js"
import { users } from "./db/user.js"

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: "Hello, world!",
    bye: "goodbye"  
  })
})

app.get('/users', (req, res) => {
  res.json({
    success: "OK",
    data: users
  })
})

app.post('/users', (req, res) => {
  console.log(req)

  res.json({
    success: "OK"
  })
})

app.listen(ENV.PORT, () => {
  console.log(`Server in running on port ${ENV.URL}${ENV.PORT}`)
})