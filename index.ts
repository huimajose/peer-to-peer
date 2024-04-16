import { Network } from "./src/network/network";
import { Node } from "./src/network/node";
import { File } from "./src/file";
import { synchronizeNetwork } from "./src/network/networkScanner";
import * as net from 'net'


// Função para criar  adicionar nós dinamicamente á rede
function createAndAddNodes(network: Network, numNodes:number) {
    
    for (let i = 1; i <= numNodes; i++) {
        const socket = new net.Socket()
        const node = new Node(`Node ${i}`, socket);
        network.addNode(node);
    }
}

//criando a rede e adicionando nós
const network = new Network();


const numNodesToAdd = 10; // Numero de nós disponiveis

createAndAddNodes(network, numNodesToAdd)

// Criando pastas correspondentes aos nós
try {
    network.createNodeFolders();
} catch (error) {
    console.error("Erro ao criar pastas dos nós:", error);
}

// Simulando transferência de arquivos entre os nós
try {
    network.simulateFileTransfer();
} catch (error) {
    console.error("Erro ao simular transferência de arquivos:", error);
}


// Sincronizando os arquivos entre os nós da rede
try {
    network.synchronizeFiles();
} catch (error) {
    console.error("Erro ao sincronizar arquivos entre os nós da rede:", error);
}