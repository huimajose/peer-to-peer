// registrationService.ts
/**Para começar a implementar a abstração de rede
 *  e a capacidade de adicionar dinamicamente novos nós,
 *  podemos criar um serviço de registro simples que permite
 *  que os nós se registrem e obtenham informações sobre outros
 *  nós na rede. Aqui está um exemplo de como podemos começar:
 * 
 *  */
import { Node } from "./node";

export class RegistrationService {

    private static instance: RegistrationService
    private nodes: Node[];


    private constructor() {
        this.nodes = []
    }
    

    public static getInstance(): RegistrationService{

if(!RegistrationService.instance){
    RegistrationService.instance = new RegistrationService();
}

        return RegistrationService.instance;
    }

    public registerNode(node: Node) {
        this.nodes.push(node);
        console.log(`Node ${node.id} registered.`)
    }

    public getNodeById(nodeId: string): Node | undefined {
        return this.nodes.find(node => node.id === nodeId )
    }

    public getAllNodes(): Node[]{
       return this.nodes;
        
    }
    public removeNodes(nodeId: string){
        this.nodes = this.nodes.filter(node => node.id !== nodeId);
        console.log(`Node ${nodeId} unregistered`)
    }
}

