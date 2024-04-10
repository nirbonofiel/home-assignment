import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
    async handleGetPosts(req:Request,res:Response){
        return PostService.getPosts(req,res);
    }
    async handleCreatePost(req:Request,res:Response){
        return PostService.createPost(req,res);
    }
    async handleDeletePost(req:Request,res:Response){
        return PostService.deletePost(req,res);
    }
    async handleUpdatePost(req:Request,res:Response){
        return PostService.updatePost(req,res);
    }
}