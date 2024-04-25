import { Network } from "./src/network/network";
import { Node } from "./src/network/node";
import { synchronizeNetwork } from "./src/network/networkScanner";
import express from 'express'
import * as net from 'net';
import Parse from "parse";
import * as networkInterface from 'network'


Parse.initialize('5ArcuTe5JcqXnW0wE9BAkQynGnfM6ScZ38V03FlR', 'Q4moQX4vvWwcg7P5RWhLImD81LF4ACwneCDjB1sI','CyQjVd5BShuRHmKucenzH5Bc4DLIikK9mgOcj3VA');
Parse.serverURL = 'https://parseapi.back4app.com/';


const network = new Network();

var setIp = '';

// Criando o servidor para aguardar a solicitação dos nós
const app = express();
const port = 3001;





  
  console.log('endereço IP', setIp);

app.post('/add-node', async (req: express.Request, res: express.Response) => {
    const newNode = new Node(`Node ${network.nodes.length + 1}`);
    network.addNode(newNode);


    //Save the node info to database

    const nodeInfo = Parse.Object.extend('nodes');
    const newNodeInfo = new nodeInfo();

    networkInterface.get_public_ip(function(err: any, ip: any) {
        //console.log(err || ip); // should return your public IP address
        //setIp =ip
        newNodeInfo.set('displayName', 'Teste');
    newNodeInfo.set('ipAddress', ip)
      })
    

    try {
        await newNodeInfo.save();
        
    } catch (error) {
        console.log(error)
    }

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

function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}

