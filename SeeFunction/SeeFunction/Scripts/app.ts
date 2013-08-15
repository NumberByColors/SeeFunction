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
        $("#numberOfFiles").html("Number of files: " + fileUploader.files.length);
        $("#fileName").html('Name: ' + file.name);
        $("#fileSize").html('Size: ' + FileUtilities.fileSizeString(file));
        $("#fileType").html('Type: ' + file.type);
        $("#numberOfVisualizableFiles").html("Number of visualizable files: " + FileUtilities.visualizableFiles(fileUploader.files).length);

        var progressHandler = function (progressEvent: ProgressEvent) {
            var progressPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            $("#uploadPercent").text(progressPercent + "% uploaded");
        }

        FileUtilities.readFileText(file, progressHandler)
                     .then((fileContents) => $("#fileContents").text(fileContents),
                           () => $("#fileContents").text("An error occurred while reading the file."));
            
        //var fileReader = new FileReader();
        //fileReader.readAsText(file);
        //fileReader.onload = (loadEvent: ProgressEvent) => {
        //    var fileContents = (<FileReader>loadEvent.target).result;
        //    $("#fileContents").text(fileContents);
        //};

        //fileReader.onerror = (errorEvent) => {
        //    $("#fileContents").text("An error occurred while reading the file.");
        //};

        //fileReader.onprogress = progressHandler;
    }
};