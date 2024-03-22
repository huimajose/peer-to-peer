import { Network } from "./src/network";
import { Node } from "./src/node";


//criando a rede e adicionando nós
const network = new Network();
const node1 = new Node(1);
const node2 = new Node(2);

network.addNode(node1);
network.addNode(node2);


//simulate a transfer file
network.simulateFileTransfer();