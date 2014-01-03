enum Color {
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Purple,
    Brown,
    Gray,
    Black,
    White
}

class ColorHelpers {
    static getHexCode(color: Color): string {
        switch (color) {
            case Color.Red:
                return "red";
                break;
            case Color.Orange:
                return "orange";
                break;
            case Color.Yellow:
                return "yellow";
                break;
            case Color.Green:
                return "green";
                break;
            case Color.Blue:
                return "blue";
                break;
            case Color.Purple:
                return "purple";
                break;
            case Color.Brown:
                return "brown";
                break;
            case Color.Gray:
                return "gray";
                break;
            case Color.Black:
                return "black";
                break;
            case Color.White:
                return "white";
                break;
        }
    }
}

