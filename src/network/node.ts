import { File } from "../file";
import * as path from "path";
import * as fs from 'fs';
import * as crypto from "crypto";
import * as zlib from 'zlib'
import { RegistrationService } from "./registrationService";

/**
 * Classe Node representa um nó na rede peer-to-peer.
 * Cada nó contém arquivos e pode realizar upload e download de arquivos para outros nós.
 */
export class Node {
    id: string;
    files: File[];
    folderPath: string;

    /**
     * Cria uma nova instância de Node.
     * @param id O identificador único do nó.
     */
    constructor(id: string) {
        this.id = id;
        this.files = [];
        this.folderPath = path.join(__dirname, 'nodes', this.id.replace(/\s+/g, '-'));
        this.createFolder();
        this.registerNode();
    }

    /**
     * Cria a pasta do nó se ela não existir.
     */
    private createFolder() {
        if (!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath);
        }
    }

    private registerNode() {
        const registrationService = RegistrationService.getInstance();
        registrationService.registerNode(this)
    }

    public disconnect(){
        const registrationService = RegistrationService.getInstance();
        registrationService.removeNodes(this.id)
    }

    /**
     * Realiza o upload de um arquivo para o nó.
     * @param file O arquivo a ser enviado para o nó.
     */
    uploadFile(file: File) {
        const filePath = path.join(this.folderPath, file.name + '.gz');
        const compressedFilePath = filePath + '.gz';
        const fileContent = zlib.gzipSync(file.content)  //Compressão do conteúdo do arquivo
       
        console.log(`Original file size: ${file.content.length} bytes`);
        console.log(`Compressed file size: ${fileContent.length} bytes`);
    
       
        fs.writeFileSync(filePath, fileContent);
        console.log(`File "${file.name}" uploaded to Node ${this.id}`);
    }

    /**
     * Realiza o download de um arquivo de outro nó.
     * @param fileName O nome do arquivo a ser baixado.
     * @param destinationNode O nó de destino para onde o arquivo será baixado.
     */
    /*downloadFile(fileName: string, destinationNode: Node) {

        const sourceFilePath = path.join(this.folderPath, fileName);
        const destinationFilePath = path.join(destinationNode.folderPath, fileName);
       
        if (fs.existsSync(sourceFilePath)) {
            if (fs.existsSync(destinationFilePath)) {
                const sourceHash = this.calculateFileHash(sourceFilePath);
                const destinationHash = destinationNode.calculateFileHash(destinationFilePath);

                if (sourceHash !== destinationHash) {
                    const readStream = fs.createReadStream(sourceFilePath);
                    const writeStream = fs.createWriteStream(destinationFilePath);
                    readStream.pipe(writeStream);
                    console.log(`Node ${this.id} downloaded file "${fileName}" to Node ${destinationNode.id}`);
                } else {
                    console.log(`File "${fileName}" already exists on Node ${destinationNode.id} and is up to date.`);
                }
            } else {
                const readStream = fs.createReadStream(sourceFilePath);
                const writeStream = fs.createWriteStream(destinationFilePath);
                readStream.pipe(writeStream);
                console.log(`Node ${this.id} downloaded file "${fileName}" to Node ${destinationNode.id}`);
            }
        } else {
            console.log(`File "${fileName}" not found on Node ${this.id}`);
        }
    }

    */


    downloadFile(fileName: string, destinationNode: Node) {
        const sourceFilePath = path.join(this.folderPath, fileName + '.gz'); // Adicione '.gz' ao nome do arquivo
        const destinationFilePath = path.join(destinationNode.folderPath, fileName);
    
        if (fs.existsSync(sourceFilePath)) {
            const compressedFileContent = fs.readFileSync(sourceFilePath);
            const fileContent = zlib.gunzipSync(compressedFileContent); // Descomprimir o conteúdo do arquivo
    
            fs.writeFileSync(destinationFilePath, fileContent);
            console.log(`Node ${this.id} downloaded file "${fileName}" to Node ${destinationNode.id}`);
        } else {
            console.log(`File "${fileName}" not found on Node ${this.id}`);
        }
    }
    

    /**
     * Calcula o hash SHA-256 de um arquivo.
     * @param filePath O caminho do arquivo para o qual o hash será calculado.
     * @returns O hash SHA-256 do arquivo.
     */
    calculateFileHash(filePath: string): string {
        const fileData = fs.readFileSync(filePath);
        return crypto.createHash('sha256').update(fileData).digest('hex');
    }
}
