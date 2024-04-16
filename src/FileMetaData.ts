import parse from 'parse'


export class FileMetaData {
    fileName: string;
    filePath: string;
    fileHash: string;
    createdAt: Date;


    constructor(fileName: string, filePath: string, fileHash: string, createdAt: Date){


        this.fileName = fileName;
        this.filePath = filePath;
        this.fileHash = fileHash;
        this.createdAt = createdAt;
    }



    async save() {
        const FileObject = Parse.Object.extend('Files');
        const fileObject = new FileObject()



        fileObject.set('fileName', this.fileName);
        fileObject.set('filePath', this.filePath);
        fileObject.set('filrHash', this.fileHash);
        fileObject.set('createdAt', this.createdAt);

        try {

            await fileObject.save();
            console.log('File metadata saved successfully');
            
        } catch (error) {
            console.error('Error saving file metadata:', error);
        }
    }
}