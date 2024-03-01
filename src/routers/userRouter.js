import express from "express";
import logger from "../middlewares/logger.js"
import listAll from "../controllers/user/listAll.js";
import create from "../controllers/user/create.js";
import remove from "../controllers/user/remove.js";
import update from "../controllers/user/update.js";

const router = express.Router()

router.get('/', logger, listAll)

router.post('/', create)

router.delete('/', remove)

router.put('/', update)

export default router