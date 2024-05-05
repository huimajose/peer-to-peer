import { Network } from "./src/network/network";
import { Node } from "./src/network/node";
import { synchronizeNetwork } from "./src/network/networkScanner";
import express from 'express';
import Parse from "parse";
import { DB } from "./src/lib/db/db";


Parse.initialize('5ArcuTe5JcqXnW0wE9BAkQynGnfM6ScZ38V03FlR', 'Q4moQX4vvWwcg7P5RWhLImD81LF4ACwneCDjB1sI','CyQjVd5BShuRHmKucenzH5Bc4DLIikK9mgOcj3VA');
Parse.serverURL = 'https://parseapi.back4app.com/';


const network = new Network();

const app = express();
const port = 3001;





app.post('/add-node', async (req: express.Request, res: express.Response) => {
    const newNode = new Node(`Node ${network.nodes.length + 1}`);
    network.addNode(newNode);

    //initialize the DB instance
DB.init();
   
    const savedData = await DB.saveInfoToDatabase(); 
   
     if(savedData){


        const { id, nodeIdentifer, ipAddress } = savedData

        console.log('Id do node:', id)

        newNode.startServer();
        res.send(savedData)
        //res.send(`Node with id ${nodeIdentifer} and ip address ${ipAddress} added successfully`);
     }
    

   
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function synchronizeFiles() {
    try {
        const nodes = await network.getNodes(); 
        network.nodes.forEach(node => {
            node.startServer();
        });
        await synchronizeNetwork(nodes);
            network.simulateFileTransfer();
       
    } catch (error) {
        console.error("Erro ao sincronizar arquivos entre os nós da rede:", error);
    }
}

setInterval(synchronizeFiles, 3000);
