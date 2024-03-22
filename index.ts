import { Network } from "./src/network";
import { Node } from "./src/node";
import { File } from "./src/file";
import { synchronizeNetwork } from "./src/networkScanner";


//criando a rede e adicionando nós
const network = new Network();


const node1 = new Node('Node 1');
const node2 = new Node('Node 2');
const node3 = new Node('Node 3')
const node4 = new Node('Node 4')

network.addNode(node1);
network.addNode(node2)
network.addNode(node3)
network.addNode(node4)

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