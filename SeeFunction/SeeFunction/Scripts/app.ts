//Handler for the window load event
window.onload = () => {
    var canvas = new Canvas("visualization", context => {
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height / 2;
        //var squareLength = 100;
        //var spacing = 5;
        //context.fillStyle = "#F65314"; //Microsoft red
        //context.fillRect(centerX - spacing - squareLength, centerY - spacing - squareLength, squareLength, squareLength); //Top-left square
        //context.fillStyle = "#7CBB00"; //Microsoft green
        //context.fillRect(centerX + spacing, centerY - spacing - squareLength, squareLength, squareLength); //Top-right square
        //context.fillStyle = "#FFBB00"; //Microsoft yellow
        //context.fillRect(centerX + spacing, centerY + spacing, squareLength, squareLength); //Bottom-right square
        //context.fillStyle = "#00A1F1"; //Microsoft blue
        //context.fillRect(centerX - spacing - squareLength, centerY + spacing, squareLength, squareLength); //Bottom-left square

        var redSquare = new Rectangle(true, Color.Red);
        redSquare.setHeight(100);
        redSquare.setWidth(100);

        var greenSquare = new Rectangle(true, Color.Green);
        greenSquare.setHeight(100);
        greenSquare.setWidth(100);

        var yellowSquare = new Rectangle(true, Color.Yellow);
        yellowSquare.setHeight(100);
        yellowSquare.setWidth(100);

        var blueSquare = new Rectangle(true, Color.Blue);
        blueSquare.setHeight(100);
        blueSquare.setWidth(100);

        var firstRow = new Rectangle(false);
        firstRow.setHorizontalChildElements([redSquare, greenSquare], 0, 5);

        var secondRow = new Rectangle(false);
        secondRow.setHorizontalChildElements([yellowSquare, blueSquare], 0, 5);

        var microsoftLogo = new Rectangle(false);
        microsoftLogo.setVerticalChildElements([firstRow, secondRow], 0, 5);

        Canvas.drawWithContext(context, microsoftLogo, centerX, centerY);
    }, { panAndZoom: true });
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
