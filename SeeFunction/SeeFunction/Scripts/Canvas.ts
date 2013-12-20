//Wraps the HTML5 Canvas element to provide additional functionality
class Canvas {
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private redraw: () => void;

    //Used for adding pan + zoom:
    private svg: SVGSVGElement;
    private transformMatrix: SVGMatrix;
    private lastXPosition: number;
    private lastYPosition: number; 

    constructor(canvasElementId: string, drawFunc: (c: CanvasRenderingContext2D) => void, canvasOptions?: CanvasOptions) {
        this.canvasElement = <HTMLCanvasElement> document.getElementById(canvasElementId);
        this.context = this.canvasElement.getContext("2d");
        
        this.redraw = () => {
            this.clearCanvas();
            drawFunc(this.context);
        }
        
        //Enable various canvas options
        if (canvasOptions) {
            if (canvasOptions.panAndZoom) {
                this.enablePanAndZoom();
            }   

            if (canvasOptions.dpiScaled) {
                this.enableDpiScaling();
            }
        }

        this.redraw();
    }

    private clearCanvas() {
        this.context.save();
        this.context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0,0,this.canvasElement.width, this.canvasElement.height);
        this.context.restore();
    }

    //Add panning + zooming to canvas, based on http://phrogz.net/tmp/canvas_zoom_to_cursor.html
    private enablePanAndZoom() {
        this.trackTransforms();
        this.redraw();

        this.lastXPosition = this.canvasElement.width / 2;
        this.lastYPosition = this.canvasElement.height / 2;
        var dragStart, dragged;

        var self = this; //Capture the 'this' for the Canvas class, not the HTMLCanvasElement within the handlers
        this.canvasElement.addEventListener("mousedown", evt => {
            (<any>document.body.style).mozUserSelect = (<any>document.body.style).webkitUserSelect = (<any>document.body.style).userSelect = 'none';
            self.lastXPosition = evt.offsetX || (evt.pageX - self.canvasElement.offsetLeft);
            self.lastYPosition = evt.offsetY || (evt.pageY - self.canvasElement.offsetTop);            
            dragStart = self.transformedPoint(self.lastXPosition, self.lastYPosition);
            dragged = false;
        }, false);

        this.canvasElement.addEventListener("mousemove", evt => {
            self.lastXPosition = evt.offsetX || (evt.pageX - self.canvasElement.offsetLeft);
            self.lastYPosition = evt.offsetY || (evt.pageY - self.canvasElement.offsetTop);
            dragged = true;
            if (dragStart) {
                var pt = self.transformedPoint(self.lastXPosition, self.lastYPosition);
                self.context.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                self.redraw();
            }
        }, false);

        this.canvasElement.addEventListener("mouseup", evt => {
            dragStart = null;
            if (!dragged) {
                self.zoom(evt.shiftKey ? -1 : 1);
            }
        }, false);

        this.canvasElement.addEventListener("DOMMouseScroll", self.handleScroll, false);
        this.canvasElement.addEventListener("mousewheel", self.handleScroll, false);
    }

    private zoom(clicks: number) {
        var pt = this.transformedPoint(this.lastXPosition, this.lastYPosition);
        this.context.translate(pt.x, pt.y);

        var scaleFactor = 1.1;
        var factor = Math.pow(scaleFactor, clicks);
        this.context.scale(factor, factor);

        this.context.translate(-pt.x, -pt.y);

        this.redraw();
    }

    private handleScroll(evt) {
        var delta = evt.wheelData ? evt.wheelData / 40 : evt.detail ? -evt.detail : 0;
        if (delta) {
            this.zoom(delta);
        }

        return evt.preventDefault() && false;
    }

    private transformedPoint(x: number, y: number) {
        var pt = this.svg.createSVGPoint();
        pt.x = x;
        pt.y = y;

        return pt.matrixTransform(this.transformMatrix.inverse());    
    }
 
    private trackTransforms() {
        this.svg = <SVGSVGElement> document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        this.transformMatrix = this.svg.createSVGMatrix();

        var savedTransforms = [];
        var save = this.context.save;
        this.context.save = () => {
            savedTransforms.push(this.transformMatrix.translate(0, 0));
            return save.call(this.context);
        };
        var restore = this.context.restore;
        this.context.restore = () => {
            this.transformMatrix = savedTransforms.pop();
            return restore.call(this.context);
        };

        var scale = this.context.scale;
        this.context.scale = (sx, sy) => {
            this.transformMatrix = this.transformMatrix.scaleNonUniform(sx, sy);
            return scale.call(this.context, sx, sy);
        };
        var rotate = this.context.rotate;
        this.context.rotate = radians => {
            this.transformMatrix = this.transformMatrix.rotate(radians * 180 / Math.PI);
            return rotate.call(this.context, radians);
        };
        var translate = this.context.translate;
        this.context.translate = (dx, dy) => {
            this.transformMatrix = this.transformMatrix.translate(dx, dy);
            return translate.call(this.context, dx, dy);
        };
        var transform = this.context.transform;
        this.context.transform = (a, b, c, d, e, f) => {
            var m2 = this.svg.createSVGMatrix();
            m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
            this.transformMatrix = this.transformMatrix.multiply(m2);
            return transform.call(this.context, a, b, c, d, e, f);
        };
        var setTransform = this.context.setTransform;
        this.context.setTransform = (a, b, c, d, e, f) => {
            this.transformMatrix.a = a;
            this.transformMatrix.b = b;
            this.transformMatrix.c = c;
            this.transformMatrix.d = d;
            this.transformMatrix.e = e;
            this.transformMatrix.f = f;
            return setTransform.call(this.context, a, b, c, d, e, f);
        };        
    }

    private enableDpiScaling() {

    }
} 

interface CanvasOptions {
    panAndZoom?: boolean;
    dpiScaled?: boolean;
}