import fs from "fs";
import { Post } from "../schamas/postSchama";

export function readJsonFile(fileName: string, callback: any) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (error) {
      callback(error, null);
    }
  });
}

export function writeJsonFile(fileName: string, methodType: string ,postReq:any, callback: any) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      console.error('Error reading file:', err);
      return;
    }
    try {
      let jsonData = JSON.parse(data);
      switch(methodType){
        case 'Create':
          jsonData.push(postReq);
          break;
        case 'Delete':
          jsonData = jsonData.filter((post:Post)=>post.id !== Number(postReq))
          break;
        case 'Update':
          {
            jsonData = jsonData.map((post:Post) => {
              if (post.id === postReq.id) {
              return {...postReq}; 
            }
            return post;
          });
          break;
        }
      }
      fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
      });
      callback(null, jsonData);
    } catch (error) {
      console.error('Error reading file:', err);
      callback(error, null);
    }
  });
}