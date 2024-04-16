//network
import * as fs from 'fs'

import { Node } from "./node";
import { File } from "../file";
import path from 'path';
import { LoadBalancer } from '../balancers/balance';
import Parse from 'parse/node';

const NUM_FILES_TO_SEND = 3;
Parse.initialize('5ArcuTe5JcqXnW0wE9BAkQynGnfM6ScZ38V03FlR', 'Q4moQX4vvWwcg7P5RWhLImD81LF4ACwneCDjB1sI','CyQjVd5BShuRHmKucenzH5Bc4DLIikK9mgOcj3VA');
Parse.serverURL = 'https://parseapi.back4app.com/';


export class Network {
    nodes: Node[];
    private loadBalancer: LoadBalancer

    constructor() {
       
        this.nodes = []
        this.loadBalancer = new LoadBalancer(this.nodes)
    }

    addNode(node: Node){
        this.nodes.push(node);
    }

    
   async simulateFileTransfer() {
        if (this.nodes.length < 2) {
            console.log("Need at least two nodes for a file transfer");
            return;
        }
    
        const masterFolderPath = path.join(__dirname, 'Master'); // Caminho para a pasta "Master"
        const filesInMaster = fs.readdirSync(masterFolderPath); // Listar arquivos na pasta "Master"
    
        if (filesInMaster.length === 0) {
            console.log("No files found in Master folder");
            return;
        }
    
        this.nodes.forEach((sender, index) => {
            const receiverIndex = (index + 1) % this.nodes.length; // Circularmente, envie para o próximo nó da lista
            const receiver = this.nodes[receiverIndex];
            if (receiver.socket) { // Verifica se o socket do receptor é válido
                filesInMaster.forEach(async fileName => {
                    const filePath = path.join(masterFolderPath, fileName);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    sender.uploadFile(fileName, fileContent, receiver.socket!);

                    const FileObject = Parse.Object.extend('Files');
                    const fileObject = new FileObject()
            
        
                fileObject.set('fileName', fileName);
                fileObject.set('filePath', filePath);
              
        
                try {
        
                    await fileObject.save();
                    console.log('File metadata saved successfully');
                    
                } catch (error) {
                    console.error('Error saving file metadata:', error);
                }
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


    getNextNode(): Node {
        return this.loadBalancer.routeRequest();
    }
    
    getNodes(): Node[] {
        return this.nodes;
    }
    
}