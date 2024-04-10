import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

router.get('/',userController.handleGetUsers);

export default router;