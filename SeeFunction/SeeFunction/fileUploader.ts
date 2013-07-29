class FileUploader {
    private fileUploadElement: HTMLInputElement;

    constructor(private fileUploadElementId: string) {
        this.fileUploadElement = <HTMLInputElement> document.getElementById(fileUploadElementId);
    }

    
}