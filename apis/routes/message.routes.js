import express from "express";

import proctectRoute from "../middlewares/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router
.get("/:id",proctectRoute,getMessages)
.post("/send/:id",proctectRoute,sendMessage)

export default router;


