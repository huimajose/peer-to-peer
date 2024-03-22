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

    
}