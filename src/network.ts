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

        const filesToSend: File[] = [];
        for (let i = 0; i < 3; i++) {
            const fileName = `Example${i+1}.txt`;
            const fileContent = `This is an example file content fro file ${i + 1}`
            filesToSend.push(new File(fileName, fileContent));
            
        }

        // Para cada par de nós na rede
    for (let i = 0; i < this.nodes.length - 1; i++) {
        const sender = this.nodes[i];
        const receiver = this.nodes[i + 1];

        // Envia todos os arquivos do remetente para o receptor
        for (const file of filesToSend) {
            sender.uploadFile(file);
            sender.downloadFile(file.name, receiver);
        }
    }
    
    }

    createNodeFolders() {
        this.nodes.forEach(node  =>{
            if(!fs.existsSync(node.folderPath)){
                fs.mkdirSync(node.folderPath)
            }
        } )
    }

    synchronizeFiles() {
        // Itera sobre cada nó na rede
        for (const node of this.nodes) {
            // Itera sobre cada arquivo no nó atual
            for (const file of node.files) {
                // Itera sobre os nós da rede, exceto o próprio nó
                for (const otherNode of this.nodes.filter(n => n !== node)) {
                    // Verifica se o arquivo existe no outro nó
                    if (!otherNode.files.some(f => f.name === file.name)) {
                        // Se o arquivo não existir no outro nó, faz o download
                        node.downloadFile(file.name, otherNode);
                    }
                }
            }
        }
    }
}