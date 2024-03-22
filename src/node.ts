// node.ts

import { File } from "./file";

export class Node {
    id: number;
    files: File[];

    constructor(id: number) {
        this.id = id;
        this.files = [];
    }

    uploadFile(file: File){
        this.files.push(file);
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
