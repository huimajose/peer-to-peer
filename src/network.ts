//network
import * as fs from 'fs'

import { Node } from "./node";
import { File } from "./file";

export class Network {
    nodes: Node[];

    constructor() {
       
        this.nodes = []
    }

    addNode(node: Node){
        this.nodes.push(node);
    }

    simulateFileTransfer(){
        if(this.nodes.length < 2 ){
            console.log("Need at lats two nodes for a file transfer simulation")
            return;
        }

        const sender = this.nodes[0];
        const reciever = this.nodes[1]
        const file = new File("example.txt", "This is an example file content")
        
        sender.uploadFile(file);
        sender.downloadFile(file.name, reciever)
    }

    createNodeFolders() {
        this.nodes.forEach(node  =>{
            if(!fs.existsSync(node.folderPath)){
                fs.mkdirSync(node.folderPath)
            }
        } )
    }
}