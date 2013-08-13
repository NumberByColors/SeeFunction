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
        var fileSize = "0";
        if (file.size > 1024 * 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024 * 1024)) / 100).toString() + ' GB';
        } else if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + ' MB';
        } else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' KB';
        }

        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
        
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