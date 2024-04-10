import express from "express";
import { PostController } from "../controllers/postController";

const router = express.Router();
const postController = new PostController();

router.get('/',postController.handleGetPosts);
router.post('/',postController.handleCreatePost);
router.delete('/:id',postController.handleDeletePost);
router.put('/:id',postController.handleUpdatePost);

export default router;