//network
import * as fs from 'fs'

import { Node } from "./node";
import { File } from "../file";

const NUM_FILES_TO_SEND = 3;

export class Network {
    nodes: Node[];

    constructor() {
       
        this.nodes = []
    }

    addNode(node: Node){
        this.nodes.push(node);
    }
    simulateFileTransfer() {
        if (this.nodes.length < 2) {
            console.log("Need at least two nodes for a file transfer");
            return;
        }
    
        const filesToSend: File[] = [];
        for (let i = 0; i < NUM_FILES_TO_SEND; i++) {
            const fileName = `Example${i + 1}.txt`;
            const fileContent = `This is an example file content for file ${i + 1}`;
            filesToSend.push(new File(fileName, fileContent));
        }
    
        this.nodes.forEach((sender, index) => {
            const receiverIndex = (index + 1) % this.nodes.length; // Circularmente, envie para o próximo nó da lista
            const receiver = this.nodes[receiverIndex];
            if (receiver.socket) { // Verifica se o socket do receptor é válido
                filesToSend.forEach(file => {
                    sender.uploadFile(file.name, file.content, receiver.socket!);
                });
            } else {
                console.log(`Skipping upload: Node ${receiver.id} does not have a valid socket.`);
            }
        });
    }
    
    createNodeFolders() {
        this.nodes.forEach(node  =>{
            if(!fs.existsSync(node.folderPath)){
                fs.mkdirSync(node.folderPath)
            }
        } )
    }

    synchronizeFiles() {
        if (this.nodes.length < 2) {
            console.log("Need at least two nodes for file synchronization");
            return;
        }
    
        // Create a set to store all file names across all nodes
        const allFiles = new Set<string>();
        for (const node of this.nodes) {
            for (const file of node.files) {
                allFiles.add(file.name);
            }
        }
    
        // Iterate over each node in the network
        for (const node of this.nodes) {
            // Iterate over all known files across all nodes
            for (const fileName of allFiles) {
                // Check if the file does not exist on the current node
                if (!node.files.some(file => file.name === fileName)) {
                    // Iterate over all other nodes, except the current node
                    for (const otherNode of this.nodes.filter(n => n !== node)) {
                        // Check if the file exists on the other node and if the other node's socket is valid
                        if (otherNode.socket && otherNode.files.some(file => file.name === fileName)) {
                            // Download the file from the other node
                            node.downloadFile(fileName, otherNode.socket);
                            // Exit the node loop since the file has been found and downloaded
                            break;
                        }
                    }
                }
            }
        }
    }
    
    
}