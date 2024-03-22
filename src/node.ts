// node.ts

import { File } from "./file";
import * as path from "path";
import * as fs from 'fs'
import * as crypto from "crypto";

export class Node {
    id: string;
    files: File[];
    folderPath: string;

    constructor(id: string) {
        this.id = id;
        this.files = [];
        this.folderPath = path.join(__dirname, 'nodes', this.id.replace(/\s+/g, '-'));

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

    downloadFile(fileName: string, destinationNode: Node){
        const sourceFilePath = path.join(this.folderPath, fileName);
        const destinationFilePath = path.join(destinationNode.folderPath, fileName)
       
        if(fs.existsSync(sourceFilePath)){

            if(fs.existsSync(destinationFilePath)){
                const sourceHash =this.calculateFileHash(sourceFilePath);
                const destinationHash = destinationNode.calculateFileHash(destinationFilePath)

                if(sourceHash !== destinationHash ){

                    const readStream = fs.createReadStream(sourceFilePath);
                    const writeStream = fs.createWriteStream(destinationFilePath)
                    readStream.pipe(writeStream)
                    console.log(`Node ${this.id} downloaded file "${fileName}" to Node ${destinationNode.id}`);
            } else {
                console.log(`File "${fileName}" already exists on Node ${destinationNode.id} and is up to date.`);
            }
                
            }else{

                const readStream = fs.createReadStream(sourceFilePath)
                const writeStream = fs.createWriteStream(destinationFilePath)
                console.log(`Node ${this.id} downloaded file "${fileName}" to Node ${destinationNode.id}`);
            }
        }else{
            console.log(`File "${fileName}" not found on Node ${this.id}`);
        }
    }

    // Função para calcular o hash de um arquivo
    calculateFileHash(filePath: string): string {
        const fileData = fs.readFileSync(filePath)
        return crypto.createHash('sha256').update(fileData).digest('hex')
    }
    
}
