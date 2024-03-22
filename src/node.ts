// node.ts

import { File } from "./file";
import path from "path";
import fs from 'fs'

export class Node {
    id: string;
    files: File[];
    folderPath: string;

    constructor(id: string) {
        this.id = id;
        this.files = [];
        this.folderPath = path.join(__dirname, 'nodes', this.id)
        this.createFolder()
    }

    private createFolder() {
        if(!fs.existsSync(this.folderPath)){
            fs.mkdirSync(this.folderPath);
        }
    }

    uploadFile(file: File){
        const filePath = path.join(this.folderPath, file.name)
        fs.writeFileSync(filePath, file.content)
        console.log(`File "${file.name}" uploaded to Node ${this.id}`);
    }

    downloadFile(fileName: string){
        console.log(`Trying to download file "${fileName}" from Node ${this.id}`);
        const fileToDownload = this.files.find(file => file.name === fileName );
        if(fileToDownload){
            console.log(`Node ${this.id} downloaded file "${fileName}"`);
            return fileToDownload;
        } else {
            console.log(`File "${fileName}" not found on Node ${this.id}`);
            return null;
        }
    }   
}
