import express from "express";
import { getMessage, sendMessage , deleteMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/:id", protectRoute, getMessage );
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:id", protectRoute, deleteMessage);

export default router;
