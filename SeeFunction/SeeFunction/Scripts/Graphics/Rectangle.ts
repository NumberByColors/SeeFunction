class Rectangle implements Drawable {
    parentElement: Drawable;
    elementType = "Rectangle";

    //Width and height are set by default by the rectangle's child elements, but can be manually set if the rectangle has no children
    private width: number;
    private height: number;

    //borderStyle: LineStyle;   

    childElements: Drawable[];
    childElementOrientation: Orientation;
    childElementSpacing: number; //spacing between each of the child elements
    childElementOffset: number; //offset from the parent element's border

    constructor(public visible: boolean, public fillColor?: Color, public borderColor?: Color) {
        this.borderColor = borderColor ? borderColor : fillColor;
    }

    getWidth(): number {
        if (!this.childElements) {
            if (this.width == 0 || this.width) {
                return this.width;
            }

            throw ("Cannot get the width of a rectangle without child elements or a manually-specified width");
        }

        switch (this.childElementOrientation) {
            case Orientation.Vertical:
                var childWidths = this.childElements.map(e => e.getWidth());
                var maxChildWidth = Math.max.apply(Math, childWidths);
                return maxChildWidth + (2 * this.childElementOffset);
                break;
            case Orientation.Horizontal:
                var childWidths = this.childElements.map(e => e.getWidth());
                var totalChildWidths = childWidths.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue;
                }, 0);
                var totalChildSpacing = this.childElementSpacing * (this.childElements.length - 1);
                return totalChildWidths + totalChildSpacing + (2 * this.childElementOffset);
                break;
        }
    }

    getHeight(): number {
        if (!this.childElements) {
            if (this.height == 0 || this.height) {
                return this.height;
            }

            throw ("Cannot get the height of a rectangle without child elements or a manually-specified height");
        }

        switch (this.childElementOrientation) {
            case Orientation.Vertical:
                var childHeights = this.childElements.map(e => e.getHeight());
                var totalChildHeights = childHeights.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue;
                }, 0);
                var totalChildSpacing = this.childElementSpacing * (this.childElements.length - 1);
                return totalChildHeights + totalChildSpacing + (2 * this.childElementOffset);
                break;
            case Orientation.Horizontal:
                var childHeights = this.childElements.map(e => e.getHeight());
                var maxChildHeight = Math.max.apply(Math, childHeights);
                return maxChildHeight + (2 * this.childElementOffset);
                break;
        }
    }

    setWidth(w: number): void {
        if (this.childElements) {
            throw ("Cannot manually set width of a rectangle with child elements");
        }

        this.width = w;
    }

    setHeight(h: number): void {
        if (this.childElements) {
            throw ("Cannot manually set height of a rectangle with child elements");
        }

        this.height = h;
    }

    setVerticalChildElements(elements: Drawable[], offset?: number, spacing?: number): void {
        this.childElementOrientation = Orientation.Vertical;
        this.childElements = elements;
        elements.forEach(e => e.parentElement = this);
        this.childElementOffset = offset ? offset : 0;
        this.childElementSpacing = spacing ? spacing : 0;
    }

    setHorizontalChildElements(elements: Drawable[], offset?: number, spacing?: number): void {
        this.childElementOrientation = Orientation.Horizontal;
        this.childElements = elements;
        elements.forEach(e => e.parentElement = this);
        this.childElementOffset = spacing ? spacing : 0;
        this.childElementSpacing = spacing ? spacing : 0;
    }
} 