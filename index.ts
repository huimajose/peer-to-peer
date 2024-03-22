import { Network } from "./src/network";
import { Node } from "./src/node";
import { File } from "./src/file";
import { synchronizeNetwork } from "./src/networkScanner";


//criando a rede e adicionando nós
const network = new Network();


const node1 = new Node('Node 1');
const node2 = new Node('Node 2');

network.addNode(node1);
network.addNode(node2)


//Criando pastas correspondentes aos nós
network.createNodeFolders();


//simulando a transferencia de arquivos
network.simulateFileTransfer();


// Sincronizando os arquivos entre os nós da rede
synchronizeNetwork(network.nodes);