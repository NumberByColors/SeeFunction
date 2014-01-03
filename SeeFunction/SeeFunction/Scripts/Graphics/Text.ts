interface Text {
    text: string;
    font?: Font;
    size?: number;
    style?: FontStyle;
} 

enum Font {
    SansSerif,
    Monospaced
}

enum FontStyle {
    Regular,
    Italic,
    Bold,
    BoldItalic
}

