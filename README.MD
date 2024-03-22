# Sistema de Troca de Arquivos Peer-to-Peer

Este é um projeto que implementa um sistema básico de troca de arquivos peer-to-peer em TypeScript.

## Funcionalidades Implementadas

1. **Upload de Arquivos**: Os nós podem fazer upload de arquivos para compartilhá-los com outros nós na rede.
2. **Download de Arquivos**: Os nós podem baixar arquivos de outros nós na rede.
3. **Transferência de Arquivos Reais**: Os arquivos são transferidos fisicamente entre as pastas dos nós no sistema de arquivos.
4. **Simulação de Rede**: Uma rede básica é simulada para testar a troca de arquivos entre os nós.
5. **Verificação de Existência e Modificação de Arquivos**: Antes de realizar o download de um arquivo, verifica-se se o arquivo já existe no nó de destino e se houve alguma modificação no arquivo.
6. **Sincronização de Arquivos**: Adicionado um utilitário para varrer a rede e sincronizar os arquivos entre os nós, copiando e fazendo o download apenas dos arquivos que foram modificados.
7. **Compressão de Arquivos**: Implementar compressão de arquivos para reduzir o tamanho dos dados transferidos.

## Implementações Futuras Propostas

1. **Gerenciamento de Arquivos em Lote**: Adicionar suporte para upload e download de múltiplos arquivos de uma só vez.
2. **Segurança**: Implementar criptografia para proteger os arquivos durante a transferência.
3. **Gerenciamento de Conexão**: Desenvolver um sistema para gerenciar desconexões e reconexões automáticas entre os nós.
4. **Resiliência a Falhas**: Adicionar mecanismos de detecção e recuperação de falhas para lidar com erros de transferência e falhas de nós.
5. **Sincronização de Arquivos**: Implementar funcionalidades para sincronização automática de arquivos entre os nós.
6. **Interface de Usuário**: Desenvolver uma interface de usuário para facilitar a interação com os nós e os arquivos na rede.
7. **Monitoramento e Logging**: Adicionar recursos de monitoramento e logging para acompanhar o status e as atividades dos nós.
8. **Autenticação e Autorização**: Adicionar autenticação e autorização para controlar o acesso aos recursos da rede.
9. **Escalabilidade**: Projetar o sistema para ser escalável, permitindo a adição fácil de novos nós e suportando redes com um grande número de participantes.

## Como Usar

1. Clone o repositório para o seu ambiente local.
2. Instale as dependências do projeto usando `npm install`.
3. Execute o projeto usando `npm start`.
4. Experimente as funcionalidades implementadas até agora e contribua com novas implementações futuras!
