import { Node } from "./node";

/**
 * Varre a rede e sincroniza os arquivos entre os nós.
 * @param nodes Os nós da rede a serem verificados e sincronizados.
 */
export function synchronizeNetwork(nodes: Node[]) {
    // Itera sobre cada nó na rede
    for (const node of nodes) {
        // Itera sobre cada arquivo no nó atual
        for (const file of node.files) {
            // Itera sobre os nós da rede, exceto o próprio nó
            for (const otherNode of nodes.filter(n => n !== node)) {
                // Verifica se o arquivo existe no outro nó e se há diferenças no conteúdo
                const otherFile = otherNode.files.find(f => f.name === file.name);
                if (otherFile && otherFile.content !== file.content) {
                    // Realiza o download do arquivo do outro nó
                    node.downloadFile(file.name, otherNode);
                }
            }
        }
    }
}
