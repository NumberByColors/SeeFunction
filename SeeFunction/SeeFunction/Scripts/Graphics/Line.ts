class Line implements Drawable {
    parentElement: Drawable;
    elementType = "Line";

    color: Color;
    style: LineStyle;
    orientation: Orientation;
    thickness: number;
    length: number;

    getWidth(): number {
        return 0; //Not implemented
    }

    getHeight(): number {
        return 0; //Not implemented
    }

} 

enum LineStyle {
    None,
    Solid,
    Dotted
}