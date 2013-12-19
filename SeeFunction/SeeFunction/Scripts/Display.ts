module Display {
    export function showUploadInfo(files: FileList) {
        var firstFile = files[0];
        $("#numberOfFiles").html("Number of files: " + files.length);
        $("#fileName").html('Name: ' + firstFile.name);
        $("#fileSize").html('Size: ' + Files.getFileSizeString(firstFile));
        $("#fileType").html('Type: ' + firstFile.type);
        $("#numberOfVisualizableFiles").html("Number of visualizable files: " + Files.getVisualizableFiles(files).length);
    }

    export function uploadProgressHandler(progressEvent: ProgressEvent) {
        var progressPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        $("#uploadPercent").text(progressPercent + "% uploaded");
    }

    export function uploadErrorHandler() {
        $("#fileContents").text("An error occurred while reading the file.");
    }

    export function showFileContents(fileContents: string) {
        $("#fileContents").text(fileContents);
    }
}