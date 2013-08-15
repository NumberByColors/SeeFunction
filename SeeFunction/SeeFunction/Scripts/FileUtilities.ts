class FileUtilities {
    static readFileText(file: File, progressHandler?: (ProgressEvent) => void): JQueryPromise<string> {
        var reader = new FileReader();
        var deferred = $.Deferred<string>();

        reader.onload = function (event: ProgressEvent) {
            deferred.resolve((<FileReader>event.target).result);
        };

        reader.onerror = function () {
            deferred.reject(this);
        };

        if (progressHandler) {
            reader.onprogress = progressHandler;
        }

        reader.readAsText(file);        

        return deferred.promise();
    }

    static fileSizeString(file: File): string {
        var fileSize = "0";
        if (file.size > 1024 * 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024 * 1024)) / 100).toString() + ' GB';
        } else if (file.size > 1024 * 1024) {
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + ' MB';
        } else {
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + ' KB';
        }

        return fileSize;
    }

    private static fileExtension(file: File): string {
        return file.name.split(".").pop();
    }

    static visualizableFiles(files: FileList): File[] {
        var supportedFileTypes = ["js"];
        var supportedFiles: File[] = [];
        for (var i = 0; i < files.length; i++) {
            var thisFile = files[i];
            var thisFileExtension = FileUtilities.fileExtension(thisFile);
            if (supportedFileTypes.indexOf(thisFileExtension) !== -1) {
                supportedFiles.push(thisFile);
            }
        }

        return supportedFiles;
    }
}