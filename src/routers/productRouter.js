import express from "express";
import listAll from "../controllers/product/listAll.js";
import create from "../controllers/product/create.js";
import update from "../controllers/product/update.js";
import remove from "../controllers/product/remove.js";

const router = express.Router()

router.get('/', listAll)

router.post('/', create)

router.delete('/', remove)

router.put('/', update)

export default router