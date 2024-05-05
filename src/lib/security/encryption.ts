import { File } from "../../file";
import * as crypto from "crypto";
import * as fs from 'fs';
import * as path from "path";


export class Encryption {
    id: string;

    folderPath: string;

    constructor(id: string) {
        this.id = id;
        this.folderPath = path.join(__dirname, 'nodes', this.id.replace(/\s+/g, '-'))
        
    }


    public calculateFileHash(filePath: string): string {
        const fileData = fs.readFileSync(filePath);
        return crypto.createHash('sha256').update(fileData).digest('hex');
    }

    private checkFileIntegrity(data: any, fileName: string){

        
        //Percorre todos os arquivos na pasta do nó e verifica a integridade
        fs.readdir(this.folderPath, (err, files) => {
            if(err ){
                console.error(`Error reading directory ${this.folderPath}: ${err.message}`);
                return;
            }

            //verificando a integridade
            if(this.isDataIntegrityValid(data)){
                console.log(`File ${fileName} is corrupted.`);
                // Registre o arquivo corrompido em um log ou notifique o administrador
            }
        })
    }

    private isDataIntegrityValid(data: Buffer): Boolean{

        const hash = crypto.createHash('sha256').update(data).digest('hex')
         // Compare o hash calculado com um hash previamente conhecido para verificar a integridade dos dados
        // Por exemplo, você pode armazenar o hash esperado junto com os arquivos ou em um banco de dados
        const expectedHash = '...'; // Defina o hash esperado aqui
        return hash === expectedHash;
    }
    

}