import { Network } from "./src/network/network";
import { Node } from "./src/network/node";
import { synchronizeNetwork } from "./src/network/networkScanner";
import express from 'express'
import * as net from 'net';

const network = new Network();

// Criando o servidor para aguardar a solicitação dos nós
const app = express();
const port = 3000;

app.post('/add-node', (req: express.Request, res: express.Response) => {
    const newNode = new Node(`Node ${network.nodes.length + 1}`);
    network.addNode(newNode);
    newNode.startServer(); // Inicia o servidor para o novo nó
    res.send('Node added successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Função para sincronizar os arquivos entre os nós da rede
function synchronizeFiles() {
    try {
        const nodes = network.getNodes(); // Obter todos os nodes existentes


        //console.log('Nós registados: ',nodes)
                // Iniciar o servidor para cada nó
network.nodes.forEach(node => {
    node.startServer();
    synchronizeNetwork(nodes);
    network.simulateFileTransfer();
});
       
    } catch (error) {
        console.error("Erro ao sincronizar arquivos entre os nós da rede:", error);
    }
}

// Sincroniza os arquivos entre os nós a cada 5 minutos (exemplo)
//setInterval(synchronizeFiles, 5 * 60 * 1000); // 5 minutos em milissegundos

setInterval(synchronizeFiles, 3000);