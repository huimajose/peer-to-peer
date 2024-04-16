import { File } from "../file";
import * as path from "path";
import * as fs from 'fs';
import * as crypto from "crypto";
import * as zlib from 'zlib';
import * as net from 'net';
import { RegistrationService } from "./registrationService";

export class Node {
    id: string;
    files: File[];
    folderPath: string;
    socket: net.Socket | null;
    private transferredFiles: Set<string>;

    constructor(id: string) {
        this.id = id;
        this.files = [];
        this.folderPath = path.join(__dirname, 'nodes', this.id.replace(/\s+/g, '-'));
        this.createFolder();
        this.registerNode();
        this.socket = null; // Inicializa como null
        this.transferredFiles = new Set<string>();

        // Inicializa o servidor no construtor
        this.initializeSocket();
    }

    private createFolder() {
        if (!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath);
        }
    }

    private registerNode() {
        const registrationService = RegistrationService.getInstance();
        registrationService.registerNode(this);
    }

    public disconnect() {
        const registrationService = RegistrationService.getInstance();
        registrationService.removeNodes(this.id);
        if (this.socket) {
            this.socket.destroy();
            this.socket = null;
        }
    }

    private tryReconnect() {
        setTimeout(() => {
            console.log(`Trying to reconnect to Node ${this.id}...`);
            this.initializeSocket();
        }, 5000);
    }

    private initializeSocket() {
        if (!this.socket) {
            this.socket = net.createConnection({ port: 3001 }, () => {
                console.log(`Node ${this.id} TCP/IP server running on port 3001`);
            });
            

            this.socket.on('error', (err) => {
                console.error(`Error in connection with Node ${this.id}: ${err.message}`);
                this.socket?.destroy();
                this.socket = null;
                this.tryReconnect();
            });

            this.socket.on('close', () => {
                console.log(`Connection with Node ${this.id} closed`);
                this.socket = null;
                this.tryReconnect();
            });

            this.socket.on('data', (data) => {
                const message = JSON.parse(data.toString());
                if (message.type === 'upload') {
                    this.uploadFile(message.fileName, message.fileContent, this.socket!); // Use ! para indicar que socket não é null
                } else if (message.type === 'download') {
                    this.downloadFile(message.fileName, this.socket!); // Use ! para indicar que socket não é null
                }
            });
        }
    }

    public startServer() {
        // Este método pode ser usado para iniciar o servidor manualmente se necessário.
    }

    public uploadFile(fileName: string, fileContent: string, socket: net.Socket) {
        if (!socket.destroyed) {
            const masterFilePath = path.join(__dirname, 'Master', fileName); // Caminho do arquivo na pasta "Master"
            const destinationFilePath = path.join(this.folderPath, fileName); // Caminho do arquivo no nó de destino
    
            if (!fs.existsSync(destinationFilePath)) { // Verificar se o arquivo já existe no nó de destino
                console.log(`[Node ${this.id}] Uploading file "${fileName}"...`);
                fs.copyFileSync(masterFilePath, destinationFilePath); // Copiar o arquivo da pasta "Master" para o nó de destino
                console.log(`File "${fileName}" uploaded to Node ${this.id}`);
                socket.write(JSON.stringify({ status: 'success', message: `File "${fileName}" uploaded successfully` }));
            } else {
                console.log(`File "${fileName}" already exists in Node ${this.id}, skipping upload.`);
                socket.write(JSON.stringify({ status: 'skipped', message: `File "${fileName}" already exists` }));
            }
        }
    }
    
    

    public downloadFile(fileName: string, socket: net.Socket) {
        if (!socket.destroyed) {
            console.log(`[Node ${this.id}] Downloading file "${fileName}"...`);
            const sourceFilePath = path.join(this.folderPath, fileName + '.gz');

            if (fs.existsSync(sourceFilePath)) {
                const compressedFileContent = fs.readFileSync(sourceFilePath);
                socket.write(JSON.stringify({ status: 'success', fileContent: compressedFileContent.toString('base64') }));
                console.log(`[Node ${this.id}] File "${fileName}" downloaded successfully`);
            } else {
                socket.write(JSON.stringify({ status: 'error', message: `File "${fileName}" not found on Node ${this.id}` }));
                console.log(`[Node ${this.id}] File "${fileName}" not found`);
            }
        }
    }

    public calculateFileHash(filePath: string): string {
        const fileData = fs.readFileSync(filePath);
        return crypto.createHash('sha256').update(fileData).digest('hex');
    }
}
