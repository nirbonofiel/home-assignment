import { Request, Response } from "express";
import { readJsonFile, writeJsonFile } from "../helpers/fsFunctions";
import { Post } from "../schamas/postSchama";



export class PostService {

    static getPosts(req: Request, res: Response) {
        try {
            const filePath = "./db/posts.json";
            readJsonFile(filePath, (err: any, jsonData: Post[]) => {
                if (err) {
                    res.status(404).json({ error: 'Error reading JSON file' });
                }
                const sortedItems = this.handleJsonRespone(jsonData);
                res.json(sortedItems);
            })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static createPost(req: Request, res: Response) {
        try {
            const postReq = req.body;
            postReq.date = new Date();
            const filePath = "./db/posts.json";
            writeJsonFile(filePath, 'Create', postReq, (err: any, jsonData: Post[]) => {
                if (err) {
                    res.status(404).json({ error: 'Error reading JSON file' });
                }
                const sortedItems = this.handleJsonRespone(jsonData);
                res.status(201).json(sortedItems);
            })
        } catch (error) {
            res.status(500).json({ error: 'cannot create post' });
        }
    }


    static deletePost(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const filePath = "./db/posts.json";
            writeJsonFile(filePath, 'Delete' ,id, (err: any, jsonData: Post[]) => {
            if (err) {
                res.status(404).json({ error: 'Error reading JSON file' });
            }
            const sortedItems = this.handleJsonRespone(jsonData);
            res.status(202).json(sortedItems);
            })
        } catch (error) {
            res.status(500).json({ error: 'cannot create post' });
        }
    }

    static updatePost(req: Request, res: Response) {
        try {
            const postReq = req.body;
            if(!postReq.date){
                postReq.date = new Date();
            }
            const filePath = "./db/posts.json";
            writeJsonFile(filePath, 'Update' ,postReq, (err: any, jsonData: Post[]) => {
            if (err) {
                res.status(404).json({ error: 'Error reading JSON file' });
            }
            const sortedItems = this.handleJsonRespone(jsonData);
            res.status(200).json(sortedItems);
            })
        } catch (error) {
            res.status(500).json({ error: 'cannot create post' });
        }
    }

    static handleJsonRespone(jsonData: Post[]) {
        const sortedItems = jsonData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })

        return sortedItems;
    }
}