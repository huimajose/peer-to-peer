import { Network } from "./src/network";
import { Node } from "./src/node";
import { File } from "./src/file";
import { synchronizeNetwork } from "./src/networkScanner";



// Função para criar  adicionar nós dinamicamente á rede
function createAndAddNodes(network: Network, numNodes:number) {
    
    for (let i = 1; i <= numNodes; i++) {
        const node = new Node(`Node ${i}`);
        network.addNode(node);
    }
}

//criando a rede e adicionando nós
const network = new Network();


const numNodesToAdd = 5; // Numero de nós disponiveis

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