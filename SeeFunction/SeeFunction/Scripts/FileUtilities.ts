class FileUtilities {
    static fileSizeString(file: File) {
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

    private static fileExtension(file: File) {
        return file.name.split(".").pop();
    }

    static visualizableFiles(files: FileList) {
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