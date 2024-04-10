import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    async handleGetUsers(req:Request,res:Response){
        return UserService.getUsers(req,res);
    }
}