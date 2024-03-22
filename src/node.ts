
// node.ts

import { File } from "./file";

export class Node {
    id: number;
    files: File[]


    constructor(id: number) {
        this.id = id;
        this.files = []
       
    }

    uploadFile(file: File){
        this.files.push(file)
    }

    downloadFile (from: Node, fileName: string){
        const fileToDownload = from.files.find(file => file.name === fileName )
        if(fileToDownload){
            this.files.push(fileToDownload)
            console.log(`Node ${this.id} downloaded file "${fileName}" from Node ${from.id}`)
        }else{
            console.log(`File "${fileName}" not found on Node ${from.id}`)
        }
    }
    
}