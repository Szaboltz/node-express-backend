import express from "express";
import users from "../db/user";

const router = express.router()

router.get('/', logger, (req, res) => { // Middleware inline 
  res.json({
    success: "OK",
    data: users
  })
})

router.post('/', (req, res) => {
  const user = req.body
  user.id = users[users.length - 1].id + 1
  users.push(user)

  res.json({
    success: "OK",
    data: users
  })
})

router.delete('/', (req, res) => {
  const user = req.body
  const result = users.filter((data) => data.id != user.id)

  res.json({
    success: "OK",
    data: result
  })
})

router.put('/', (req, res) => {
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

export default router