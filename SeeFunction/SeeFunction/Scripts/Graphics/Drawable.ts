interface Drawable {
    parentElement: Drawable;
    elementType: string;

    getWidth(): number;
    getHeight(): number;
} 