import {S3 } from 'aws-sdk'
import fs from 'fs'


const s3 = new S3({

    accessKeyId: '51392da41038aa11cb059f54a473dbbc',
    secretAccessKey: '4670c4404ff9936b1a17150ff56ac182aa1ecee5a7a9807be33aae28bd2f100f',
    endpoint: 'https://e795495ec37414590a6b257ecfb2dc45.r2.cloudflarestorage.com'
});


export const downloadFileFromS3 = async (fileName: string, destinationPath: string)=> {


    try {
        const params = {
            Bucket: 'vercel',
            Key: fileName
        };

        const response = await s3.getObject(params).promise();


        fs.writeFileSync(destinationPath, response.Body as Buffer)

        console.log('Arquivo baixado: ', fileName)

        return destinationPath;
        
    } catch (error) {

        console.error('Erro ao baixar arquivo do S3:', error);
        throw error;
        
    }
}


export const uploadFileToNode = async (fileName: string, destinationPath: string, socket: any) => {
    try {
        if (!socket.destroyed) {
            const fileContent = fs.readFileSync(destinationPath);

            console.log(`Enviando arquivo "${fileName}" para o node...`);
            // Aqui você deve implementar a lógica para enviar o arquivo para o node
            // Por exemplo, enviar o arquivo via socket para o node
            // socket.write(fileContent);

            console.log(`Arquivo "${fileName}" enviado para o node`);
        }
    } catch (error) {
        console.error('Erro ao enviar arquivo para o node:', error);
        throw error;
    }
};