import express from "express";
import listAll from "../controllers/product/listAll.js";
import create from "../controllers/product/create.js";
import update from "../controllers/product/update.js";
import remove from "../controllers/product/remove.js";
import getProductByID from "../controllers/product/getProductByID.js";

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getProductByID)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', update)

export default router