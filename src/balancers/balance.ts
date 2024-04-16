import { Network } from "../network/network";
import { Node } from "../network/node"

export class LoadBalancer {

    private servers: Node[]
    private currentServerIndex: number

    constructor(servers: Node[]) {
        this.servers = servers;
        this.currentServerIndex = 0;
       
    }

    routeRequest(): Node {

        const nextServer = this.servers[this.currentServerIndex];
        this.currentServerIndex = (this.currentServerIndex + 1) % this.servers.length;
        return nextServer;
    }

    
    
}



