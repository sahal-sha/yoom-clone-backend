import express from "express";
import proctectRoute from "../middlewares/protectRoute.js";
import { getUserForSideBar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",proctectRoute,getUserForSideBar)


export default router;


