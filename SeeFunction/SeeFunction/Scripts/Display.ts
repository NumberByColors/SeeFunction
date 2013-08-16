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

    export function uploadErrorHandler(errorEvent: ErrorEvent) {
        $("#fileContents").text("An error occurred while reading the file.");
    }

    export function showFileContents(fileContents: string) {
        $("#fileContents").text(fileContents);

        //I got the hair-brained idea that writing to the DOM several times would make the page more responsive:
        //var fileContentsDiv = $("#fileContents");
        //fileContentsDiv.text("");

        //var chunkSize = 512; //512 characters ~= 1 KB
        //var numOfChunks = Math.ceil(fileContents.length / chunkSize);
        //var chunks: string[]= [];
        //for (var i = 0; i < numOfChunks; i++) {
        //    var position = chunkSize * i;
        //    chunks.push(fileContents.substr(position, chunkSize));
        //}

        
        //chunks.forEach((chunk) => fileContentsDiv.append(chunk));
    }
}