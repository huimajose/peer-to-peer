import Parse from 'parse'


Parse.initialize('5ArcuTe5JcqXnW0wE9BAkQynGnfM6ScZ38V03FlR', 'Q4moQX4vvWwcg7P5RWhLImD81LF4ACwneCDjB1sI','CyQjVd5BShuRHmKucenzH5Bc4DLIikK9mgOcj3VA');
Parse.serverURL = 'https://parseapi.back4app.com/';



export class FileMetaData {
    fileName: string;
    filePath: string;
    //fileHash: string;
    //createdAt: Date;


    constructor(fileName: string, filePath: string){


        this.fileName = fileName;
        this.filePath = filePath;
        //this.fileHash = fileHash;
        //this.createdAt = createdAt;
    }



    async save() {
        const FileObject = Parse.Object.extend('Files');
        const fileObject = new FileObject()



        fileObject.set('fileName', this.fileName);
        fileObject.set('filePath', this.filePath);
       // fileObject.set('filrHash', this.fileHash);
        //fileObject.set('createdAt', this.createdAt);

        try {

            await fileObject.save();
            console.log('File metadata saved successfully');
            
        } catch (error) {
            console.error('Error saving file metadata:', error);
        }
    }
}