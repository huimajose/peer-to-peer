import { Network } from "./src/network";
import { Node } from "./src/node";
import { File } from "./src/file";


//criando a rede e adicionando nós
const network = new Network();

const node1 = new Node(1);
const node2 = new Node(2);



const file = new File("example.txt", "This is an example file content")
node2.uploadFile(file)


const downloadFile = node2.downloadFile("example.txt")
if(downloadFile){
    node1.uploadFile(downloadFile)
}