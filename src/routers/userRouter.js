import express from "express";
import logger from "../middlewares/logger.js"
import listAll from "../controllers/user/listAll.js";
import create from "../controllers/user/create.js";
import remove from "../controllers/user/remove.js";
import update from "../controllers/user/update.js";
import getByIdController from "../controllers/user/getByIdController.js";

const router = express.Router()

router.get('/', logger, listAll)
router.get('/:id', getByIdController)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', update)

export default router