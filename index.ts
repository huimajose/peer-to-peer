import { Network } from "./src/network/network";
import { Node } from "./src/network/node";
import { File } from "./src/file";
import { synchronizeNetwork } from "./src/network/networkScanner";
import * as net from 'net'
import { LoadBalancer } from "./src/balancers/balance";


// Função para criar  adicionar nós dinamicamente á rede
function createAndAddNodes(network: Network, numNodes:number) {
    
    const nodes: Node[] = [];
    for (let i = 1; i <= numNodes; i++) {
        const socket = new net.Socket()
        const node = new Node(`Node ${i}`);
        nodes.push(node);
    }

    //Criate nodes dinamically to the network
  // Adicionar cada nó individualmente à rede
  nodes.forEach(node => {
    network.addNode(node);
});


    //Inicite server in each node
    nodes.forEach(node => {
        node.startServer();
    });


    //Config balancer to distribuite all conection between socket
    const loadBalancer = new LoadBalancer(nodes)

    //Get next node
    network.getNextNode = () => loadBalancer.routeRequest();
    
}

//criando a rede e adicionando nós
const network = new Network();


const numNodesToAdd = 3; // Numero de nós disponiveis

createAndAddNodes(network, numNodesToAdd)

// Criando pastas correspondentes aos nós
try {
    network.createNodeFolders();
} catch (error) {
    console.error("Erro ao criar pastas dos nós:", error);
}

// Iniciar o servidor para cada nó
network.nodes.forEach(node => {
    node.startServer();
});

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