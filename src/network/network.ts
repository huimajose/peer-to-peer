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

    simulateFileTransfer(){
        if(this.nodes.length < 2 ){
            console.log("Need at lats two nodes for a file transfer")
            return;
        }

        const filesToSend: File[] = [];
        for (let i = 0; i < NUM_FILES_TO_SEND; i++) {
            const fileName = `Example${i+1}.txt`;
            const fileContent = `This is an example file content fro file ${i + 1}`
            filesToSend.push(new File(fileName, fileContent));
            
        }

    
        this.nodes.forEach((sender, index) =>{

            const receiver = this.nodes[(index + 1) % this.nodes.length]; // Circularmente, envie para o proximo nó da lista
           filesToSend.forEach(file =>{
            sender.uploadFile(file.name, file.content, receiver.socket)
           })
        })
    
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
    
        // Criar um conjunto para armazenar todos os nomes de arquivos em todos os nós
        const allFiles = new Set<string>();
        for (const node of this.nodes) {
            for (const file of node.files) {
                allFiles.add(file.name);
            }
        }
    
        // Iterar sobre cada nó na rede
        for (const node of this.nodes) {
            // Iterar sobre todos os arquivos conhecidos em todos os nós
            for (const fileName of allFiles) {
                // Verificar se o arquivo não existe no nó atual
                if (!node.files.some(file => file.name === fileName)) {
                    // Iterar sobre todos os outros nós, exceto o próprio nó
                    for (const otherNode of this.nodes.filter(n => n !== node)) {
                        // Verificar se o arquivo existe no outro nó
                        if (otherNode.files.some(file => file.name === fileName)) {
                            // Fazer o download do arquivo do outro nó
                            node.downloadFile(fileName, otherNode.socket);
                            // Sair do loop de nós, pois o arquivo foi encontrado e baixado
                            break;
                        }
                    }
                }
            }
        }
    }
    
}