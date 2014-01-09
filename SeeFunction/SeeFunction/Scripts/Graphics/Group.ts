interface Group {
    elements: any[]; //first element is top/left, last element is bottom/right
    orientation: Orientation;
    spacing?: number; //null means auto, 0 means no spacing, positive number means that amount of spacing between elements
}

//needs some kind of alignment and relative positioning?