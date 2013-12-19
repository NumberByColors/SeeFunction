//Handler for the window load event
window.onload = () => {
    var canvas = <HTMLCanvasElement> document.getElementById("visualization");
    var context = canvas.getContext("2d");
    context.font = "14px sans-sarif";
    context.textAlign = "center";
    context.fillText("Hello, world!", canvas.width / 2, canvas.height / 2);
};

//Handler for the file uploader
//From http://www.matlus.com/html5-file-upload-with-progress/
//This site seems better: http://www.html5rocks.com/en/tutorials/file/dndfiles/
var fileUploader = <HTMLInputElement> document.getElementById("fileUploader");
fileUploader.onchange = () => {
    if (fileUploader.files) {        
        Display.showUploadInfo(fileUploader.files);  

        Files.readFileText(fileUploader.files[0], Display.uploadProgressHandler)
             .then(Display.showFileContents, Display.uploadErrorHandler);       
    }
};