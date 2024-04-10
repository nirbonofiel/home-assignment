import { Request, Response } from "express";
import { readJsonFile } from "../helpers/fsFunctions";
import { User } from "../schamas/userSchama";


export class UserService {

    static getUsers(req: Request, res: Response) {
        try {
            const filePath = "./db/users.json";
            readJsonFile(filePath, (err: any, jsonData: User[]) => {
                if (err) {
                    res.status(404).json({ error: 'Error reading JSON file' });
                }
                res.json(jsonData);
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}