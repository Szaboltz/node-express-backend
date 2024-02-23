import express from "express";
import products from "../db/product";

const router = express.router()

router.get('/', logger, (req, res) => { // Middleware inline 
  res.json({
    success: "OK",
    data: products
  })
})

router.post('/', (req, res) => {
  const product = req.body
  product.id = products[products.length - 1].id + 1
  products.push(product)

  res.json({
    success: "OK",
    data: products
  })
})

router.delete('/', (req, res) => {
  const product = req.body
  const result = products.filter((data) => data.id != product.id)

  res.json({
    success: "OK",
    data: result
  })
})

router.put('/', (req, res) => {
  const product = req.body;
  const result = products.map((data) => {
    if (data.id == product.id) {
       data.name = product.name;
       data.email = product.email || data.email
    }
    return data; 
  });

  res.json({
    success: "OK",
    data: result
  })
})

export default router