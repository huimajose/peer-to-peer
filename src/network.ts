//network
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
        sender.downloadFile(reciever, file.name)
    }
}