//Handler for the window load event
window.onload = () => {

};

//Handler for the file uploader
//From http://www.matlus.com/html5-file-upload-with-progress/
//This site seems better: http://www.html5rocks.com/en/tutorials/file/dndfiles/
var fileUploader = <HTMLInputElement> document.getElementById("fileUploader");
fileUploader.onchange = () => {
    var file = fileUploader.files[0];
    if (file) {        
        document.getElementById("numberOfFiles").innerHTML = "Number of files: " + fileUploader.files.length;
        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + FileUtilities.fileSizeString(file);
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
        document.getElementById("numberOfVisualizableFiles").innerHTML = "Number of visualizable files: " + FileUtilities.visualizableFiles(fileUploader.files).length;
                
        var fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (loadEvent: ProgressEvent) => {
            var fileContents = (<FileReader>loadEvent.target).result;
            $("#fileContents").text(fileContents);
        };

        fileReader.onerror = (errorEvent) => {
            $("#fileContents").text("An error occurred while reading the file.");
        };
    }
};