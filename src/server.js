import express from "express"
import ENV from "./config.js"
import users  from "./db/user.js"
import logger from "./middlewares/logger.js"

const app = express()

app.use(express.json()) // Esse cara é um midware
app.use(logger)  // Middleware global para todos os users

app.get('/', (req, res) => {
  res.json({
    message: "Hello, world!",
    bye: "goodbye"  
  })
})

app.get('/users', logger, (req, res) => { // Middleware inline 
  res.json({
    success: "OK",
    data: users
  })
})

app.post('/users', (req, res) => {
  const user = req.body
  user.id = users[users.length - 1].id + 1
  users.push(user)

  res.json({
    success: "OK",
    data: users
  })
})

app.delete('/users', (req, res) => {
  const user = req.body
  const result = users.filter((data) => data.id != user.id)

  res.json({
    success: "OK",
    data: result
  })
})

app.put('/users', (req, res) => {
  const user = req.body;
  const result = users.map((data) => {
    if (data.id == user.id) {
       data.name = user.name;
       data.email = user.email || data.email
    }
    return data; 
  });

  res.json({
    success: "OK",
    data: result
  })
})

app.listen(ENV.PORT, () => {
  console.log(`Server in running on port ${ENV.URL}${ENV.PORT}`)
})