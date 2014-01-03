interface Line {
    color: Color;
    style: LineStyle;
    orientation: Orientation;
    thickness: number;
    length: number;
} 

enum LineStyle {
    None,
    Solid,
    Dotted
}