//Handler for the window load event
window.onload = () => {

};

//Handler for the file drag-and-drop event
//From http://www.matlus.com/html5-file-upload-with-progress/
var fileUploader = <HTMLInputElement> document.getElementById("fileUploader");
fileUploader.onchange = () => {
    var file = fileUploader.files[0];
    if (file) {
        var fileSize: string = "0";
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
};
