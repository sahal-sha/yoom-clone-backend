import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import proctectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router
.get("/:id",proctectRoute,getMessage)
.post("/send/:id",proctectRoute,sendMessage)

export default router;


